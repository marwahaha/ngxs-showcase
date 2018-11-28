import {Component, OnInit} from '@angular/core';
import {Person} from './models/person.model';
import {Observable} from 'rxjs/Observable';
import {Select} from '@ngxs/store';
import {PersonsState} from './store/states/persons.state';
import {PersonService} from './services/person.service';
import {Router} from '@angular/router';

@Component({
  selector: 'persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  @Select(PersonsState.persons)
  persons$: Observable<Person>;

  constructor(private service: PersonService, private router: Router) {
  }

  ngOnInit(): void {
    this.service.loadPersons();
  }

  onAdd(): void {
    this.router.navigate(['/persons', 'add'])
  }

}
