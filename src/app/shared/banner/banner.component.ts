import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person.model';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { AppState } from '@core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @Select(AppState.getSelectedPerson)
  person$: Observable<Person>;
  person: Person;

  constructor() {}

  ngOnInit() {
    this.person$.subscribe(person => (this.person = person));
  }
}
