import {PersonEditComponent} from './person-edit.component';
import {ActivatedRoute, Router} from '@angular/router';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PersonsComponent} from '../persons.component';
import {MaterialModule} from '@shared';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxsModule, Store} from '@ngxs/store';
import {PersonService} from '../services/person.service';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PersonEditState} from '../store/states/person-edit.state';
import {PersonsState} from '../store/states/persons.state';
import {PersonSelected} from '../../../core/store/actions/app-state.actions';
import {FormAdded} from '../store/actions/person-edit-state.actions';
import {personRoutes} from '../persons.module';
import {Location} from '@angular/common';
import {NgxsFormPluginModule, UpdateFormValue} from '@ngxs/form-plugin';
import {of} from 'rxjs';

describe('PersonEditComponent', () => {
  describe('IT', () => {

    let component: PersonEditComponent;
    let fixture: ComponentFixture<PersonEditComponent>;
    let router: Router;
    let store: Store;

    setupTestBed(
      {
        declarations: [
          PersonsComponent,
          PersonEditComponent
        ],
        imports: [
          MaterialModule,
          NoopAnimationsModule,
          ReactiveFormsModule,
          RouterTestingModule.withRoutes(personRoutes),
          NgxsModule.forRoot([PersonEditState, PersonsState]),
          NgxsFormPluginModule.forRoot()
        ],
        providers: [
          PersonService,
          {
            provide: ActivatedRoute,
            useValue:
              {
                snapshot: {
                  params: {
                    id: 1
                  }
                }
              }
          }
        ]
      }
    );

    const assertWhenStable = (callback) => {
      fixture.detectChanges();
      fixture.whenStable().then(callback);
    };

    beforeEach(() => {
      fixture = TestBed.createComponent(PersonEditComponent);
      component = fixture.componentInstance;
      store = TestBed.get(Store);
      router = TestBed.get(Router);
    });

    describe('ngOnInit', () => {
      //TODO
      it('should load the person in the PersonsState', async(() => {
        assertWhenStable(() => store.selectOnce(PersonsState.getPersons).subscribe(
          (model) => expect(model).toHaveLength(2)
        ));
      }));

      it('should load Person with id 1 in the PersonEditState when editMode is true', () => {
        assertWhenStable(() => {
          expect(component.editMode).toBeTruthy();
          store.selectOnce(PersonEditState.getModel).subscribe(
            (model) => expect(model).toEqual({id: 1, forename: 'Robert C.', name: 'Martin'})
          );
        });
      });
    });

    describe('Form', () => {

      describe('Save Button', () => {
        let saveButton: HTMLButtonElement;

        beforeEach(() => {
          saveButton = fixture.debugElement.query(By.css('.button')).nativeElement;
        });

        it('should be inactive at init', () => {
          assertWhenStable(() => {
            expect(component.personForm.valid).toBeTruthy();
            expect(saveButton.disabled).toBe(true);

          });
        });

        it('should call onSave when clicked', async(() => {
          jest.spyOn(component, 'onSave');
          saveButton.click();
          expect(component.onSave).toHaveBeenCalledTimes(1);
          const location: Location = TestBed.get(Location);
          expect(location.path()).toBe('/persons');
        }));

      });

      describe('Cancel Button', () => {

        it('should call onCancel when Cancel button is clicked', () => {
          const cancelButton: HTMLButtonElement = fixture.debugElement.query(By.css('[name="cancelButton"')).nativeElement;
          jest.spyOn(component, 'onCancel');
          cancelButton.click();
          expect(component.onCancel).toHaveBeenCalledTimes(1);
          const location: Location = TestBed.get(Location);
          expect(location.path()).toBe('/persons');
        });
      });
    });


  });

  describe('UT', () => {
      let component: PersonEditComponent;
      const dispatchFunction = jest.fn();
      const selectFunction = jest.fn();
      const loadPersonFunction = jest.fn();
      const navigateFunction = jest.fn();

      beforeEach(() => {

        const activeRoute = {
          snapshot: {
            params: {
              id: 1
            }
          }
        };


        const store = {
          dispatch: dispatchFunction,
          select: selectFunction
        };

        const service = {
          loadPersons: loadPersonFunction
        };

        const router = {
          navigate: navigateFunction
        };

        // @ts-ignore
        component = new PersonEditComponent(activeRoute, store, service, router);
        dispatchFunction.mockReset();
        selectFunction.mockReset();
        loadPersonFunction.mockReset();
        navigateFunction.mockReset();
      });

      describe('ngOnInit', () => {

        beforeEach(() => {
          Object.defineProperty(component, 'addingMode$', {writable: true});
          component.addingMode$ = of(false);
          selectFunction.mockReturnValueOnce(of(() => {
            return {
              id: 1,
              name: 'Martins',
              forename: 'Robert'
            }
          }));
        });

        it('should call loadPersons', () => {
          component.ngOnInit();
          expect(loadPersonFunction.mock.calls.length).toEqual(1);
        });

        it('should dispatch actions', function () {
          component.ngOnInit();
          expect(dispatchFunction.mock.calls.length).toEqual(2);
          expect(dispatchFunction.mock.calls[0][0]).toBeInstanceOf(PersonSelected);
          expect(dispatchFunction.mock.calls[1][0]).toBeInstanceOf(UpdateFormValue);
        });

        it('should set editMode to false', () => {
          component.addingMode$ = of(true);
          component.ngOnInit();
          expect(component.editMode).toBe(false);
        });
      });

      describe('onSave', () => {

        it('should dispatch a modify person action', () => {
          component.onSave();
          expect(dispatchFunction.mock.calls.length).toEqual(1);
        });

        it('should navigate back to /persons', () => {
          component.onSave();
          expect(navigateFunction.mock.calls.length).toEqual(1);
          expect(navigateFunction.mock.calls[0][0]).toEqual(['/persons']);
        });

      });

      describe('onCancel', () => {

        it('should navigate back to /persons', () => {
          component.onCancel();
          expect(navigateFunction.mock.calls.length).toEqual(1);
          expect(navigateFunction.mock.calls[0][0]).toEqual(['/persons']);
        });
      });

      describe('onAdd', () => {

        it('should dispatch addPerson action', () => {
          component.onAdd();
          expect(dispatchFunction.mock.calls.length).toEqual(1);
          expect(dispatchFunction.mock.calls[0][0]).toBeInstanceOf(FormAdded);
        });
      });

      describe('Form', () => {

        beforeEach(() => {
          Object.defineProperty(component, 'addingMode$', {writable: true});
          component.addingMode$ = of(false);
          selectFunction.mockReturnValueOnce(of(() => {
            return {
              id: 1,
              name: 'Martins',
              forename: 'Robert'
            }
          }));
          component.ngOnInit();
        });

        it('should be invalid if all the fields are empty', () => {
          component.personForm.patchValue({id: null, name: '', forename: '', birthDate: null});
          expect(component.personForm.getRawValue()).toEqual({id: null, name: '', forename: ''})
          expect(component.personForm.valid).toBe(false);
        });

        it('should be valid when field are filled', () => {
          component.personForm.patchValue({name: 'Brown', forename: 'Simon'});
          console.log(component.personForm.getRawValue());
          expect(component.personForm.valid).toBe(true);
        });

      });
    }
  );
})
;

