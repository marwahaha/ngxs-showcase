import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Person} from '../models/person.model';

@Injectable()
export class PersonService {

  constructor() {
  }

  getPersons(): Observable<Person> {
    return Observable.of({id: 1, name: 'Martin', forename: 'Robert C.'}, {id: 2, name: 'Brown', forename: 'Simon'});
  }
}
