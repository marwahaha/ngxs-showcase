import {inject, TestBed} from '@angular/core/testing';

import {PersonService} from './person.service';

describe('PersonService', () => {

  setupTestBed({
    providers: [PersonService]
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
});
