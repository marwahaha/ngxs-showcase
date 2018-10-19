import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonsComponent} from './persons.component';
import {MatCardModule, MatIconModule, MatListModule} from '@angular/material';
import {PersonService} from './service/person.service';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [
    PersonsComponent
  ],
  declarations: [PersonsComponent],
  providers: [
    PersonService
  ]
})
export class PersonsModule {
}
