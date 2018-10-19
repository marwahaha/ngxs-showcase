import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {MatSidenavModule} from '@angular/material';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterModule
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
