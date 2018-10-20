import {async, TestBed} from '@angular/core/testing';
import {NgxsModule, Store} from '@ngxs/store';
import {MainState} from './main-state';
import {Person} from '../../../modules/persons/models/person.model';
import {InitMainState} from '../actions/main-state.actions';

describe('Main State', () => {
  let store: Store;

  setupTestBed({
    imports: [NgxsModule.forRoot([MainState])]
  });

  beforeEach(() => {
    TestBed.compileComponents();
    store = TestBed.get(Store);
  });

  it('should init to empty', () => {
    store.selectOnce(state => expect(state.persons).toEqual([]))
  });

  describe('InitMainState action', () => {

    it('should fill state with its content', async(() => {
      const expectedPerson: Person[] = [{id: 1, name: "premier", forename: "1"}, {
        id: 2,
        name: "seconde",
        forename: "2"
      }];
      store.dispatch(new InitMainState(expectedPerson));
      store.selectOnce(state => expect(state.persons).toEqual(expectedPerson));
    }));
  });
});



