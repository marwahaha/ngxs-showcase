import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonsComponent} from './persons.component';
import {Person} from './models/person.model';
import {MatCardModule, MatIconModule, MatListModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxsModule, Store} from '@ngxs/store';
import {PersonsState} from './store/states/persons-state.state';
import {PersonService} from './services/person.service';
import {InitMainState} from './store/actions/main-state.actions';

describe('PersonsComponent', () => {
  let component: PersonsComponent;
  let fixture: ComponentFixture<PersonsComponent>;

  let store: Store;
  const loadPersons = jest.fn();

  setupTestBed({
    declarations: [PersonsComponent],
    imports: [
      MatCardModule,
      MatListModule,
      MatIconModule,
      RouterTestingModule,
      NgxsModule.forRoot([PersonsState])
    ],
    providers: [
      {
        provide: PersonService,
        useValue: {
          loadPersons: loadPersons
        }
      }
    ]
  });

  beforeEach(() => {
    TestBed.compileComponents();
    store = TestBed.get(Store);
    loadPersons.mockReset();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async((done) => {
      expect(component).toBeTruthy();
    })
  );
  it('should intialize the Store', () => {
    expect(loadPersons.mock.calls.length).toBe(1);
  });

  describe('persons$', () => {

    const expectedPerson: Person[] = [{id: 1, name: 'premier', forename: '1'}, {id: 2, name: 'second', forename: '2'}];

    it('should be initialized with the content of the State', async((done) => {
      store.dispatch(new InitMainState(expectedPerson));
      const persons: Person[] = [];
      component.persons$.subscribe(
        (person) => persons.push(person),
        (error) => done.fail(error),
        () => expect(persons).toEqual(expectedPerson)
      );
    }));
  });

});
