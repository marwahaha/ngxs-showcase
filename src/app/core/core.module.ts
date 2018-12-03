import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {MatSidenavModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {BannerComponent} from './banner/banner.component';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterModule
  ],
  exports: [
    SideMenuComponent,
    BannerComponent
  ],
  declarations: [
    SideMenuComponent,
    BannerComponent
  ]
})
export class CoreModule {
}
