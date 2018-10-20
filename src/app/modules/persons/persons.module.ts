import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonsComponent} from './persons.component';
import {MatCardModule, MatIconModule, MatListModule} from '@angular/material';
import {PersonService} from './services/person.service';
import {PersonEditComponent} from './person-edit/person-edit.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [
    PersonsComponent,
    PersonEditComponent
  ],
  declarations: [PersonsComponent, PersonEditComponent],
  providers: [
    PersonService
  ]
})
export class PersonsModule {
}
