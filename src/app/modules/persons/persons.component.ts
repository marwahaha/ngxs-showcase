import {Component, OnInit} from '@angular/core';
import {Person} from './models/person.model';
import {Observable} from 'rxjs/Observable';
import {Select} from '@ngxs/store';
import {PersonsState} from './store/states/persons-state.state';
import {PersonService} from './services/person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  @Select(PersonsState.persons)
  persons$: Observable<Person>;

  constructor(private service: PersonService) {
  }

  ngOnInit(): void {
    console.log('init PersonsCompoent');
    this.service.loadPersons();
  }
}
