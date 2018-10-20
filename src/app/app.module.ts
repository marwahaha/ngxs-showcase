import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {MaterialModule} from './commons/material/material.module';
import {CoreModule} from './core/core.module';
import {PersonsModule} from './modules/persons/persons.module';
import {RouterModule, Routes} from '@angular/router';
import {PersonsComponent} from './modules/persons/persons.component';
import {PersonEditComponent} from './modules/persons/person-edit/person-edit.component';
import {NgxsModule, Store} from '@ngxs/store';
import {MainState} from './core/store/states/main-state';
import {PersonService} from './modules/persons/services/person.service';
import {Person} from './modules/persons/models/person.model';
import {InitMainState} from './core/store/actions/main-state.actions';

const appRoutes: Routes = [
  {
    path: 'persons',
    component: PersonsComponent
  },
  {
    path: 'persons/:id',
    component: PersonEditComponent
  },
  {
    path: '**',
    redirectTo: 'persons'
  }
];

export function loadPerson(personService: PersonService, store: Store) {
  return () => {
    let persons: Person[] = [];
    personService.getPersons().subscribe(
      (person) => persons.push(person),
      (error) => console.log(error),
      () => store.dispatch(new InitMainState(persons))
    )
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    CoreModule,
    PersonsModule,
    RouterModule.forRoot(appRoutes),
    NgxsModule.forRoot([MainState])
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: loadPerson, deps: [PersonService, Store], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
