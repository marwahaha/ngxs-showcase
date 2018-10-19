import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {MaterialModule} from './commons/material/material.module';
import {CoreModule} from './core/core.module';
import {PersonsModule} from './modules/persons/persons.module';
import {RouterModule, Routes} from '@angular/router';
import {PersonsComponent} from './modules/persons/persons.component';
import {PersonEditComponent} from './modules/persons/person-edit/person-edit.component';

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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
