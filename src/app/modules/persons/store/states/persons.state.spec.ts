import {async, TestBed} from '@angular/core/testing';
import {NgxsModule, Store} from '@ngxs/store';
import {PersonsState} from './persons.state';
import {Person} from '../../models/person.model';
import {InitPersonsState, ModifyPerson} from '../actions/persons-state.actions';

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
      store.selectOnce(state => {
        expect(PersonsState.persons(state)).toEqual(expectedPersons);
        expect(PersonsState.isLoaded(state)).toEqual(true);
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
});



