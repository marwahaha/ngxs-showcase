import {Component} from '@angular/core';
import {Person} from './models/person.model';
import {Observable} from 'rxjs';
import {Select} from '@ngxs/store';
import {MainState} from '../../core/store/MainState';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent {

  @Select(MainState.persons)
  persons$: Observable<Person>;

  constructor() {
  }
}
