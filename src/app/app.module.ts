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
import {PersonsStateState} from './modules/persons/store/states/persons-state.state';
import {PersonService} from './modules/persons/services/person.service';
import {Person} from './modules/persons/models/person.model';
import {InitMainState} from './modules/persons/store/actions/main-state.actions';

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
    NgxsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
