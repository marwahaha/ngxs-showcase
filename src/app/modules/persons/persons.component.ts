import {Component, OnInit} from '@angular/core';
import {PersonService} from './service/person.service';
import {Person} from './models/person.model';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  persons: Person[] = [];

  constructor(private service: PersonService) {
  }

  ngOnInit() {
    this.service.getPersons().subscribe(
      person => this.persons.push(person)
    );
  }

}
