import {PersonEditComponent} from './person-edit.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PersonsComponent} from '../persons.component';
import {MaterialModule} from '@shared';
import {ReactiveFormsModule} from '@angular/forms';
import {Store} from '@ngxs/store';
import {PersonService} from '../services/person.service';
import {Person} from '../models/person.model';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs/observable/of';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('PersonEditComponent', () => {

  let location: Location;
  let component: PersonEditComponent;
  let fixture: ComponentFixture<PersonEditComponent>;

  const dispatchFunction = jest.fn();
  const selectFunction = jest.fn();
  const loadPersonsFunction = jest.fn();

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
        RouterTestingModule
      ],
      providers: [
        {
          provide: Store,
          useValue: {
            dispatch: dispatchFunction,
            select: selectFunction
          }
        },
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
            navigate: jest.fn()
          }
        }
      ]
    }
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonEditComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    selectFunction.mockReset();
    const expectedPerson1: Person = {
      id: 1,
      name: 'Martins',
      forename: 'Robert'
    };
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
  });

  describe('Form', () => {

    let saveButton: HTMLElement;

    beforeEach(() => {
      loadPersonsFunction.mockReset();
      fixture.detectChanges();
      saveButton = fixture.debugElement.query(By.css('.button')).nativeElement;
    });

    it('should initialize with the save button inactive', () => {
      expect(saveButton.disabled).toBe(true);
    });

    it('should be valid', () => {

      expect(component.personForm.valid).toBe(true);
    });

    it('should call onSave when Save button is clicked', async(() => {
      const expectedFn = jest.spyOn(component, 'onSave');
      component.personForm.patchValue({id: 1, name: 'name', forename: 'forename'});
      fixture.detectChanges();
      expect(saveButton.disabled).toBeFalsy();
      saveButton.click();
      fixture.whenStable().then(() =>
        expect(expectedFn).toHaveBeenCalledTimes(1)
      );
    }));

    it('should call onCancel when Cancel button is clicked', function () {
      fail();
    });

  });

  describe('onSave', () => {

    it('should dispatch a modify person action', function () {
      fail();
    });

    it('should navigate back to /persons', function () {
      fail();
    });

  });

  describe('onCancel', () => {
    it('should navigate bakc to /persons', function () {
      fail();
    });
  });

});
