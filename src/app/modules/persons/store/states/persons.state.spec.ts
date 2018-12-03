import {async, fakeAsync, TestBed} from '@angular/core/testing';
import {NgxsModule, Store} from '@ngxs/store';
import {PersonsState} from './persons.state';
import {Person} from '../../models/person.model';
import {InitPersonsState, ModifyPerson, NewPerson, SelectPerson} from '../actions/persons-state.actions';
import {PersonsStateModel} from '../models/persons-state.model';

describe('Persons State', () => {
  let store: Store;

  const personOne: Person = {id: 1, name: 'premier', forename: '1'};
  const expectedPersons: Person[] = [personOne, {
    id: 2,
    name: 'second',
    forename: '2'
  }];

  setupTestBed({
    imports: [NgxsModule.forRoot([PersonsState])]
  });

  beforeEach(() => {
    store = TestBed.get(Store);
  });

  it('should init to empty', () => {
    store.selectOnce(state => expect(state.persons).toEqual([]));
  });

  describe('InitPersonsState action', () => {

    it('should fill state with its content', async(() => {
      store.dispatch(new InitPersonsState(expectedPersons));
      store.selectOnce(state => expect(state.persons).toEqual(expectedPersons));
    }));
  });

  describe('Selector \'PersonState.persons\'', () => {
    it('should return all the persons in the state', async(() => {
      store.dispatch(new InitPersonsState(expectedPersons));
      store.selectOnce((state: PersonsStateModel) => {
        expect(PersonsState.persons(state)).toEqual(expectedPersons);
        expect(PersonsState.isLoaded(state)).toEqual(true);
        expect(state.maxId).toEqual(2);
      });
    }));
  });

  describe('ModifyPerson action', () => {

    const modifiedPerson: Person = {id: 1, name: 'premier', forename: '10'};

    it('should replace an existing person', async(() => {
      store.dispatch(new InitPersonsState(expectedPersons));
      store.dispatch(new ModifyPerson(modifiedPerson));
      store.selectOnce(PersonsState.persons).subscribe(
        persons => {
          expect(persons).toContain(modifiedPerson);
          expect(persons).not.toContain(personOne);
        }
      );
    }));
  });

  describe('NewPerson action', () => {

    const newPerson: Person = {name: 'premier', forename: 'forename'};

    it('should add the person to the pre existing one', () => {
      store.dispatch(new InitPersonsState(expectedPersons));
      store.dispatch(new NewPerson(newPerson));
      store.selectOnce((state: PersonsStateModel) => {
        const lastPerson: Person = state.persons[state.persons.length - 1];
        expect(lastPerson.forename).toEqual(newPerson.forename);
        expect(lastPerson.name).toEqual(newPerson.name);
        expect(lastPerson.id).toBeTruthy();
        expect(state.persons).toHaveLength(3);
      });
    });
  });

  describe('SelectPerson action', () => {

    it('should set selectedPerson field in state', () => {
      store.dispatch(new InitPersonsState(expectedPersons));
      store.selectOnce((state: PersonsStateModel) => {
        expect(state.selectedPerson).toBeFalsy();
      });
      store.dispatch(new SelectPerson(personOne));
      store.selectOnce((state: PersonsStateModel) => {
        expect(state.selectedPerson).toEqual(personOne);
      });
    });

    it('should throw an exception if the person doesnt exist', () => {
      store.dispatch(new InitPersonsState(expectedPersons));
      try {
        store.dispatch(new SelectPerson({id: 999, name: 'name', forename: 'forename'}));
      } catch (e) {
        expect(e).toBeTruthy();
      }
      store.selectOnce((state: PersonsStateModel) => {
        expect(state.selectedPerson).toEqual(personOne);
      });
    });

  });

  describe('selectedPerson', () => {

    xit('should return nothing when no one is selected', fakeAsync(() => {
      store.selectOnce(PersonsState.selectedPerson);
      // TODO try to do the test
    }));

    it('should return the selected person', () => {
      store.dispatch(new InitPersonsState(expectedPersons));
      store.dispatch(new SelectPerson(personOne));
      store.selectOnce(PersonsState.selectedPerson).subscribe(
        person => expect(person).toBe(personOne)
      );
    });
  });
});



