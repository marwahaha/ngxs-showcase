import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import 'rxjs/add/observable/from';
import {PersonService} from '../services/person.service';
import {EditionCanceled} from '../store/actions/persons-state.actions';
import {PersonsState} from '../store/states/persons.state';
import {first, map} from 'rxjs/operators';
import {Person} from '../../../models/person.model';
import {UpdateForm, UpdateFormValue} from '@shared';
import {Observable, Subscription} from 'rxjs';
import {FormAdded, FormSaved} from '../store/actions/person-edit-state.actions';
import {PersonSelected} from '../../../core/store/actions/app-state.actions';

@Component({
  selector: 'person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit, OnDestroy {

  @Select(PersonsState.isAddingMode)
  addingMode$: Observable<boolean>;

  personForm: FormGroup;

  editMode: boolean = true;

  // Observable Subscriptions
  private modeSubscription: Subscription;
  private personStateSubscription: Subscription;

  constructor(private activeRoute: ActivatedRoute, private store: Store, private service: PersonService, private router: Router) {

  }

  ngOnInit() {
    // load person if not yet done
    this.service.loadPersons();
    // create the reactive form
    this.personForm = new FormGroup({
      'id': new FormControl(null),
      'name': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),
      'forename': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),
      // 'birthDate': new FormControl(null)
      // TODO create a custom validator for a date in the past
    });
    // Read the id from the URL and find the corresponding person in the store
    this.modeSubscription = this.addingMode$.subscribe(
      mode => {
        if (mode) {
          this.editMode = false;
          // force the form to empty
          this.store.dispatch(new UpdateForm({
            path: 'personEdit.personEditForm',
            value: null,
            dirty: null,
            status: null,
            errors: null
          }));
        } else {
          let idParam = this.activeRoute.snapshot.params['id'];
          if (idParam) {
            this.personStateSubscription = this.store.select(PersonsState.findPerson)
              .pipe(
                map(filterFn => filterFn(parseInt(idParam))),
                first()
              )
              .subscribe(
                (person: Person) => {
                  console.log(`Person to edit in the form : ${JSON.stringify(person)}`);
                  this.store.dispatch(new PersonSelected(person));
                  // Map the found person to the form
                  this.store.dispatch(new UpdateFormValue({
                    value: {
                      id: person.id,
                      name: person.name,
                      forename: person.forename,
                    },
                    path: 'personEdit.personEditForm'
                  }));
                }
              );
          }
        }
      });
  }

  onSave() {
    this.store.dispatch(new FormSaved());
    this.navigateBackToPersons()
  }

  onCancel() {
    this.store.dispatch(new EditionCanceled());
    if (this.editMode) {
      this.navigateBackToPersons()
    }
  }

  onAdd() {
    this.store.dispatch(new FormAdded());
  }

  private navigateBackToPersons(): void {
    this.router.navigate(['/persons']);
  }

  ngOnDestroy(): void {
    this.modeSubscription.unsubscribe();
    if (this.personStateSubscription) {
      this.personStateSubscription.unsubscribe();
    }

  }
}
