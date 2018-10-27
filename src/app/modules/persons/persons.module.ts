import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonsComponent} from './persons.component';
import {PersonService} from './services/person.service';
import {PersonEditComponent} from './person-edit/person-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {NgxsModule} from '@ngxs/store';
import {PersonsState} from './store/states/persons.state';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../core/core.module';
import {PersonEditState} from './store/states/person-edit.state';
import {NgxsFormPluginModule} from '../../shared/ngxs/form.module';
import {MaterialModule} from '../../shared/material/material.module';

export const personRoutes: Routes = [
  {
    path: '',
    component: PersonsComponent
  },
  {
    path: ':id',
    component: PersonEditComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    NgxsModule.forFeature([PersonsState, PersonEditState]),
    NgxsFormPluginModule.forRoot(),
    RouterModule.forChild(personRoutes),
    ReactiveFormsModule,
    CoreModule
  ],
  exports: [
    PersonsComponent,
    PersonEditComponent,
    RouterModule
  ],
  declarations: [
    PersonsComponent,
    PersonEditComponent
  ],
  providers: [
    PersonService
  ]
})
export class PersonsModule {
}
