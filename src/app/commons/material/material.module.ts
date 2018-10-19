import {NgModule} from '@angular/core';
import {MatButtonModule, MatSidenavModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatButtonModule,
    MatSidenavModule
  ],
  exports: [
    MatButtonModule,
    MatSidenavModule,
    NoopAnimationsModule
  ]
})
export class MaterialModule {
}
