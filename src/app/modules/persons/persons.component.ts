import {Component} from '@angular/core';
import {Person} from './models/person.model';
import {Observable} from 'rxjs/Observable';
import {Select} from '@ngxs/store';
import {PersonsStateState} from './store/states/persons-state.state';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent {

  @Select(PersonsStateState.persons)
  persons$: Observable<Person>;

  constructor() {
  }
}
