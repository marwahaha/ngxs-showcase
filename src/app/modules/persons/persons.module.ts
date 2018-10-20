import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonsComponent} from './persons.component';
import {MatCardModule, MatIconModule, MatListModule} from '@angular/material';
import {PersonService} from './services/person.service';
import {PersonEditComponent} from './person-edit/person-edit.component';
import {RouterModule} from '@angular/router';
import {NgxsModule, Store} from '@ngxs/store';
import {Person} from './models/person.model';
import {InitMainState} from './store/actions/main-state.actions';
import {PersonsStateState} from './store/states/persons-state.state';

export function loadPerson(personService: PersonService, store: Store) {
  return () => {
    const persons: Person[] = [];
    personService.getPersons().subscribe(
      (person) => persons.push(person),
      (error) => console.log(error),
      () => store.dispatch(new InitMainState(persons))
    );
  };
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    NgxsModule.forFeature([PersonsStateState])
  ],
  exports: [
    PersonsComponent,
    PersonEditComponent
  ],
  declarations: [PersonsComponent, PersonEditComponent],
  providers: [
    {provide: APP_INITIALIZER, useFactory: loadPerson, deps: [PersonService, Store], multi: true},
    PersonService
  ]
})
export class PersonsModule {
}
