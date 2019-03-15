import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonsComponent } from './persons.component';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { PersonsState } from './store/states/persons.state';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonEditState } from './store/states/person-edit.state';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { SharedModule } from 'app/shared/shared.module';

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
    SharedModule,
    NgxsModule.forFeature([PersonsState, PersonEditState]),
    NgxsFormPluginModule.forRoot(),
    RouterModule.forChild(personRoutes),
    ReactiveFormsModule
  ],
  exports: [PersonsComponent, PersonEditComponent, RouterModule],
  declarations: [PersonsComponent, PersonEditComponent]
})
export class PersonsModule {}
