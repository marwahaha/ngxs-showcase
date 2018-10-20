import {async, inject, TestBed} from '@angular/core/testing';

import {PersonService} from './person.service';
import {Store} from '@ngxs/store';

describe('PersonService', () => {

  setupTestBed({
    providers: [PersonService,
      {
        provide: Store,
        useValue: {dispatch: jest.fn()}
      }]
  });

  it('should be created', inject([PersonService], (service: PersonService) => {
    expect(service).toBeTruthy();
  }));
  it('should contains two Persons', (done) => {
    let counter = 0;
    const service: PersonService = TestBed.get(PersonService);
    service.getPersons().subscribe(
      () => counter++,
      (error) => done.fail(error),
      () => {
        expect(counter).toBe(2);
        done();
      }
    );
  });
  describe('laodPersons', () => {
    it('should call the store', async(() => {
      const service: PersonService = TestBed.get(PersonService);
      const store = jest.spyOn(TestBed.get(Store), 'dispatch');
      service.loadPersons();
      expect(store.mock.calls.length).toBe(1);
    }));
  });
});
