import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {MatSidenavModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule
  ],
  exports: [
    SideMenuComponent
  ],
  declarations: [
    SideMenuComponent
  ]
})
export class CoreModule {
}
