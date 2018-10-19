import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/of';
import {Person} from '../models/person.model';

@Injectable()
export class PersonService {

  constructor() {
  }

  getPersons(): Observable<Person> {
    return Observable.of({name: "1"}, {name: "2"})
  }
}
