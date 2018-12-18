import {async, TestBed} from '@angular/core/testing';

import {PersonService} from './person.service';
import {Store} from '@ngxs/store';
import {of} from 'rxjs';

describe('PersonService', () => {

  const service: PersonService;

  const selectFunction = jest.fn();
  const dispatchFunction = jest.fn();

  setupTestBed({
    providers: [
      PersonService,
      {
        provide: Store,
        useValue: {
          dispatch: dispatchFunction,
          select: selectFunction
        }
      }
    ]
  });

  beforeEach(() =>
    service = TestBed.get(PersonService)
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPersons$', () => {

    it('should return two Persons', (done) => {
      let counter = 0;
      service.getPersons$().subscribe(
        () => counter++,
        (error) => done.fail(error),
        () => {
          expect(counter).toBe(2);
          done();
        }
      );
    });
  });

  describe('loadPersons', () => {

    const store: Store;

    beforeEach(() => {
        store = jest.spyOn(TestBed.get(Store), 'dispatch');
        dispatchFunction.mockReset();
      }
    );

    it('should call store when state is empty', async(() => {
      selectFunction.mockReturnValueOnce(of(false));
      service.loadPersons();
      expect(store.mock.calls.length).toEqual(1);
    }));

    it('should not call the store if state is already loaded', function () {
      selectFunction.mockReturnValueOnce(of(true));
      service.loadPersons();
      expect(store.mock.calls.length).toEqual(0);
    });

  });
});
