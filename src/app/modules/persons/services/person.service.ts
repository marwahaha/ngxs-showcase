import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Person} from '../../../models/person.model';
import {InitPersonsState} from '../store/actions/persons-state.actions';
import {Store} from '@ngxs/store';
import {PersonsState} from '../store/states/persons.state';

@Injectable()
export class PersonService {

  constructor(private store: Store) {
  }

  getPersons$(): Observable<Person> {
    return Observable.of({id: 1, name: 'Martin', forename: 'Robert C.'}, {id: 2, name: 'Brown', forename: 'Simon'});
  }

  loadPersons(): void {
    const persons: Person[] = [];
    this.store.select(PersonsState.isLoaded).subscribe(
      (loaded) => {
        if (!loaded) {
          this.getPersons$().subscribe(
            (person) => {
              persons.push(person);
              console.log(person);
            },
            (error) => console.log(error),
            () => this.store.dispatch(new InitPersonsState(persons))
          );
        }
      }
    );
  }
}
