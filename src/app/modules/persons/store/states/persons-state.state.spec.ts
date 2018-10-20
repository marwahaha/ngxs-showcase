import {async, TestBed} from '@angular/core/testing';
import {NgxsModule, Store} from '@ngxs/store';
import {PersonsStateState} from './persons-state.state';
import {Person} from '../../models/person.model';
import {InitMainState} from '../actions/main-state.actions';

describe('Main State', () => {
  let store: Store;
  const expectedPerson: Person[] = [{id: 1, name: 'premier', forename: '1'}, {
    id: 2,
    name: 'second',
    forename: '2'
  }];

  setupTestBed({
    imports: [NgxsModule.forRoot([PersonsStateState])]
  });

  beforeEach(() => {
    TestBed.compileComponents();
    store = TestBed.get(Store);
  });

  it('should init to empty', () => {
    store.selectOnce(state => expect(state.persons).toEqual([]));
  });

  describe('InitMainState action', () => {

    it('should fill state with its content', async(() => {
      store.dispatch(new InitMainState(expectedPerson));
      store.selectOnce(state => expect(state.persons).toEqual(expectedPerson));
    }));
  });

  describe('Selector persons', () => {
    it('should return all the persons in the state', async(() => {
      store.dispatch(new InitMainState(expectedPerson));
      store.selectOnce(state => {
        expect(PersonsStateState.persons(state.persons)).toEqual(expectedPerson);
      });
    }));
  });
});



