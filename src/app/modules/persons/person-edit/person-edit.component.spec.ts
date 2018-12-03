import {PersonEditComponent} from './person-edit.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {PersonsComponent} from '../persons.component';
import {MaterialModule} from '@shared';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxsModule, Store} from '@ngxs/store';
import {PersonService} from '../services/person.service';
import {Person} from '../../../models/person.model';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs/observable/of';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PersonEditState} from '../store/states/person-edit.state';
import {PersonsState} from '../store/states/persons.state';
import {AddPerson} from '../store/actions/persons-state.actions';

describe('PersonEditComponent', () => {

  let location: Location;
  let component: PersonEditComponent;
  let fixture: ComponentFixture<PersonEditComponent>;
  let store: Store;
  let selectFunction;
  let dispatchFunction;

  const loadPersonsFunction = jest.fn();
  const navigateFunction = jest.fn();

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
        RouterTestingModule,
        NgxsModule.forRoot([PersonEditState, PersonsState])
      ],
      providers: [
        {
          provide: PersonService,
          useValue: {
            loadPersons: loadPersonsFunction
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: 1
              }
            }
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: navigateFunction
          }
        }
      ]
    }
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonEditComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    const expectedPerson1: Person = {
      id: 1,
      name: 'Martins',
      forename: 'Robert'
    };
    store = TestBed.get(Store);
    selectFunction = jest.spyOn(store, 'select');
    dispatchFunction = jest.spyOn(store, 'dispatch');
    selectFunction.mockReset();
    dispatchFunction.mockReset();
    selectFunction.mockReturnValueOnce(of((id) => {
      expect(id).toEqual(1);
      return expectedPerson1
    }));
  });

  it('should create', async(() => {
      expect(component).toBeTruthy();
    })
  );

  describe('ngOnInit', () => {

    beforeEach(() => {
      loadPersonsFunction.mockReset();
    });

    it('should load the persons', () => {
      component.ngOnInit();
      expect(loadPersonsFunction.mock.calls.length).toEqual(1);
      expect(selectFunction.mock.calls.length).toEqual(1);
      expect(component.editMode).toBeTruthy();
    });

    it('should populate the form with the values of the correct person', () => {
      component.ngOnInit();
      expect(selectFunction.mock.calls.length).toEqual(1);
      expect(component.personForm.getRawValue()).toEqual({
        id: 1,
        name: 'Martins',
        forename: 'Robert',
        birthDate: null
      })
    });

    it('should set edit to true', () => {
      const activeRoute: ActivatedRoute = TestBed.get(ActivatedRoute);
      activeRoute.snapshot.params['id'] = 'add';
      component.ngOnInit();
      expect(component.editMode).toBeFalsy();
      activeRoute.snapshot.params['id'] = '1'; //reset the mock for further test
    });
  });

  describe('Form', () => {

    let saveButton: HTMLButtonElement;

    beforeEach(() => {
      loadPersonsFunction.mockReset();
      fixture.detectChanges();
      saveButton = fixture.debugElement.query(By.css('.button')).nativeElement;
    });
    it('should initialize with the save button inactive', fakeAsync(() => {
      tick();
      expect(saveButton.disabled).toBe(true);
    }));


    it('should be invalid if all the fields are empty', () => {
      component.personForm.patchValue({id: null, name: '', forename: '', birthDate: null});
      expect(component.personForm.getRawValue()).toEqual({id: null, name: '', forename: '', birthDate: null})
      expect(component.personForm.valid).toBe(false);
    });

    it('should be valid when field are filled', () => {
      component.personForm.patchValue({name: 'Brown', forename: 'Simon'});
      console.log(component.personForm.getRawValue());
      expect(component.personForm.valid).toBe(true);
    });

    it('should call onSave when Save button is clicked', fakeAsync(() => {
      jest.spyOn(component, 'onSave');
      component.personForm.markAsTouched();
      expect(component.editMode).toBeTruthy();
      expect(component.personForm.valid).toBe(true);
      expect(component.personForm.touched).toBe(true);
      fixture.detectChanges();
      tick();
      expect(saveButton.disabled).toBe(false);
      saveButton.click();
      tick();
      expect(component.onSave).toHaveBeenCalledTimes(1)
    }));

    it('should call onCancel when Cancel button is clicked', () => {
      const cancelButton: HTMLButtonElement = fixture.debugElement.query(By.css('[name="cancelButton"')).nativeElement;
      jest.spyOn(component, 'onCancel');
      cancelButton.click();
      expect(component.onCancel).toHaveBeenCalledTimes(1);

    });
  });

  // Problem with the selector of ngxs
  describe('onSave', () => {

    beforeEach(() => {
      navigateFunction.mockReset();
      dispatchFunction.mockReset();
    });

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

    beforeEach(() => {
      navigateFunction.mockReset();
    });

    it('should navigate back to /persons', () => {
      component.onCancel();
      expect(navigateFunction.mock.calls.length).toEqual(1);
      expect(navigateFunction.mock.calls[0][0]).toEqual(['/persons']);
    });
  });

  describe('onAdd', () => {
    beforeEach(() => {
      navigateFunction.mockReset();
      dispatchFunction.mockReset();
    });

    it('should dispatch addPerson action', () => {
      component.onAdd();
      expect(dispatchFunction.mock.calls.length).toEqual(1);
      expect(dispatchFunction.mock.calls[0][0]).toBeInstanceOf(AddPerson);
    });

    it('should navigate back to /persons', () => {
      component.onAdd();
      expect(navigateFunction.mock.calls.length).toEqual(1);
      expect(navigateFunction.mock.calls[0][0]).toEqual(['/persons']);
    });

  });
});
