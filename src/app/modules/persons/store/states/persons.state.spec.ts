import {async, TestBed} from '@angular/core/testing';
import {NgxsModule, Store} from '@ngxs/store';
import {PersonsState} from './persons.state';
import {Person} from '../../models/person.model';
import {InitPersonsState} from '../actions/main-state.actions';

describe('Persons State', () => {
  let store: Store;
  const expectedPerson: Person[] = [{id: 1, name: 'premier', forename: '1'}, {
    id: 2,
    name: 'second',
    forename: '2'
  }];

  setupTestBed({
    imports: [NgxsModule.forRoot([PersonsState])]
  });

  beforeEach(() => {
    TestBed.compileComponents();
    store = TestBed.get(Store);
  });

  it('should init to empty', () => {
    store.selectOnce(state => expect(state.persons).toEqual([]));
  });

  describe('InitPersonsState action', () => {

    it('should fill state with its content', async(() => {
      store.dispatch(new InitPersonsState(expectedPerson));
      store.selectOnce(state => expect(state.persons).toEqual(expectedPerson));
    }));
  });

  describe('Selector \'PersonState.persons\'', () => {
    it('should return all the persons in the state', async(() => {
      store.dispatch(new InitPersonsState(expectedPerson));
      store.selectOnce(state => {
        expect(PersonsState.persons(state)).toEqual(expectedPerson);
        expect(PersonsState.isLoaded(state)).toEqual(true);
      });
    }));
  });
});



