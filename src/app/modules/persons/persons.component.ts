import {Component, OnInit} from '@angular/core';
import {Person} from '../../models/person.model';
import {Observable} from 'rxjs/Observable';
import {Select, Store} from '@ngxs/store';
import {PersonsState} from './store/states/persons.state';
import {PersonService} from './services/person.service';
import {Router} from '@angular/router';
import {OpenAddingMode} from './store/actions/persons-state.actions';

@Component({
  selector: 'persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  @Select(PersonsState.persons)
  persons$: Observable<Person>;

  @Select(PersonsState.isAddingMode)
  addingMode$: Observable<boolean>;

  add: boolean = false;

  constructor(private service: PersonService, private router: Router, private store: Store) {
  }

  ngOnInit(): void {
    this.service.loadPersons();
    this.addingMode$.subscribe(
      mode => this.add = mode
    )
  }

  onAdd(): void {
    this.store.dispatch(new OpenAddingMode());
  }

  onSelect(person: Person) {
    this.router.navigate(['/persons', person.id])
  }

}
