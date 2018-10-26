import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule, MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatSidenavModule
} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

@NgModule({
  imports: [
  ],
  exports: [
    MatButtonModule,
    MatSidenavModule,
    NoopAnimationsModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatMomentDateModule
  ]
})
export class MaterialModule {
}
