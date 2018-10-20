import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Person} from '../models/person.model';
import {Store} from '@ngxs/store';
import {InitMainState} from '../store/actions/main-state.actions';

@Injectable()
export class PersonService {

  constructor(private store: Store) {
  }

  getPersons(): Observable<Person> {
    return Observable.of({id: 1, name: 'Martin', forename: 'Robert C.'}, {id: 2, name: 'Brown', forename: 'Simon'});
  }

  loadPersons(): void {
    const persons: Person[] = [];
    this.getPersons().subscribe(
      (person) => persons.push(person),
      (error) => console.log(error),
      () => this.store.dispatch(new InitMainState(persons))
    );
  }
}
