import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatSidenavModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
  ],
  exports: [
    MatButtonModule,
    MatSidenavModule,
    NoopAnimationsModule,
    MatListModule,
    MatCardModule,
    MatIconModule
  ]
})
export class MaterialModule {
}
