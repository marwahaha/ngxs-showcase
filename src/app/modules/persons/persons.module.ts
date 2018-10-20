import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonsComponent} from './persons.component';
import {
  MatButtonModule,
  MatCardModule, MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule
} from '@angular/material';
import {PersonService} from './services/person.service';
import {PersonEditComponent} from './person-edit/person-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {NgxsModule} from '@ngxs/store';
import {PersonsState} from './store/states/persons-state.state';
import {ReactiveFormsModule} from '@angular/forms';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

const personRoutes: Routes = [
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
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatMomentDateModule,
    NgxsModule.forFeature([PersonsState]),
    RouterModule.forChild(personRoutes),
    ReactiveFormsModule
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
