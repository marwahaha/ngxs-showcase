import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonsComponent} from './persons.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    PersonsComponent
  ],
  declarations: [PersonsComponent]
})
export class PersonsModule {
}
