import {ChangeDetectorRef, Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {getValue, Store} from '@ngxs/store';
import {FormGroupDirective} from '@angular/forms';
import {debounceTime, first, takeUntil} from 'rxjs/operators';
import {UpdateForm, UpdateFormDirty, UpdateFormErrors, UpdateFormStatus, UpdateFormValue} from './actions';
import {Subject} from 'rxjs/Subject';

/**
 * Imported from https://github.com/ngxs/store/blob/v3.2.0/packages/form-plugin/src/directive.ts
 */
@Directive({
  selector: '[ngxsForm]'
})
export class MyNgxsFormDirective implements OnInit, OnDestroy {

  @Input('ngxsForm') path: string;
  @Input('ngxsFormDebounce') debounce = 100;
  @Input('ngxsFormClearOnDestroy') clearDestroy: boolean;

  private _destroy$ = new Subject<null>();
  private _updating = false;

  constructor(private _store: Store, private _formGroupDirective: FormGroupDirective, private _cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    console.log('init the form directive');
    this._store
      .select(state => getValue(state, `${this.path}.model`))
      .pipe(takeUntil(this._destroy$))
      .subscribe(model => {
        if (!this._updating && model) {
          this._formGroupDirective.form.patchValue(model);
          this._cd.markForCheck();
        }
      });

    // On first state change, sync form model, status and dirty with state
    this._store
      .select(state => getValue(state, `${this.path}`))
      .pipe(takeUntil(this._destroy$), first())
      .subscribe(state => {
        this._store.dispatch([
          new UpdateFormValue({
            path: this.path,
            value: this._formGroupDirective.form.getRawValue()
          }),
          new UpdateFormStatus({
            path: this.path,
            status: this._formGroupDirective.form.status
          }),
          new UpdateFormDirty({
            path: this.path,
            dirty: this._formGroupDirective.form.dirty
          })
        ]);
      });

    this._store
      .select(state => getValue(state, `${this.path}.dirty`))
      .pipe(takeUntil(this._destroy$))
      .subscribe(dirty => {
        if (this._formGroupDirective.form.dirty !== dirty) {
          if (dirty === true) {
            this._formGroupDirective.form.markAsDirty();
            this._cd.markForCheck();
          } else if (dirty === false) {
            this._formGroupDirective.form.markAsPristine();
            this._cd.markForCheck();
          }
        }
      });

    this._store
      .select(state => getValue(state, `${this.path}.disabled`))
      .pipe(takeUntil(this._destroy$))
      .subscribe(disabled => {
        if (this._formGroupDirective.form.disabled !== disabled) {
          if (disabled === true) {
            this._formGroupDirective.form.disable();
            this._cd.markForCheck();
          } else if (disabled === false) {
            this._formGroupDirective.form.enable();
            this._cd.markForCheck();
          }
        }
      });

    this._formGroupDirective.valueChanges.pipe(debounceTime(this.debounce), takeUntil(this._destroy$)).subscribe(() => {
      console.log('Value Change !');
      const value = this._formGroupDirective.control.getRawValue();
      this._updating = true;
      this._store
        .dispatch([
          new UpdateFormValue({
            path: this.path,
            value: value
          }),
          new UpdateFormDirty({
            path: this.path,
            dirty: this._formGroupDirective.dirty
          }),
          new UpdateFormErrors({
            path: this.path,
            errors: this._formGroupDirective.errors
          })
        ])
        .subscribe({
          error: () => (this._updating = false),
          complete: () => (this._updating = false)
        });
    });

    this._formGroupDirective.statusChanges
      .pipe(debounceTime(this.debounce), takeUntil(this._destroy$))
      .subscribe((status: string) => {
        this._store.dispatch(
          new UpdateFormStatus({
            status,
            path: this.path
          })
        );
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();

    if (this.clearDestroy) {
      this._store.dispatch(
        new UpdateForm({
          path: this.path,
          value: null,
          dirty: null,
          status: null,
          errors: null
        })
      );
    }
  }

}