import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsComponent } from './persons.component';
import { Person } from '../../models/person.model';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { PersonsState } from './store/states/persons.state';
import { PersonService } from './services/person.service';
import { InitPersonsState } from './store/actions/persons-state.actions';
import { Router } from '@angular/router';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';

describe('PersonsComponent', () => {
  let component: PersonsComponent;
  let fixture: ComponentFixture<PersonsComponent>;

  let store: Store;
  const loadPersonsFunction = jest.fn();
  const navigateFunction = jest.fn();

  setupTestBed({
    declarations: [PersonsComponent, PersonEditComponent],
    imports: [
      SharedModule,
      RouterTestingModule,
      ReactiveFormsModule,
      NgxsModule.forRoot([PersonsState])
    ],
    providers: [
      {
        provide: PersonService,
        useValue: {
          loadPersons: loadPersonsFunction
        }
      },
      {
        provide: Router,
        useValue: {
          navigate: navigateFunction
        }
      }
    ]
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    loadPersonsFunction.mockReset();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', async(done => {
    expect(component).toBeTruthy();
  }));
  it('should initialize the Store', () => {
    fixture.detectChanges();
    expect(loadPersonsFunction.mock.calls.length).toBe(1);
  });

  describe('persons$', () => {
    const expectedPerson: Person[] = [
      { id: 1, name: 'premier', forename: '1' },
      { id: 2, name: 'second', forename: '2' }
    ];

    it('should be initialized with the content of the State', async(done => {
      store.dispatch(new InitPersonsState(expectedPerson));
      const persons: Person[] = [];
      component.persons$.subscribe(
        person => persons.push(person),
        error => done.fail(error),
        () => expect(persons).toEqual(expectedPerson)
      );
    }));
  });

  describe('onAdd', () => {
    beforeEach(() => {
      jest.spyOn(store, 'dispatch');
    });

    it('should navigate to person edition component in addition mode', () => {
      component.onAdd();
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
