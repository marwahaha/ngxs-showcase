import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {RouterModule} from '@angular/router';
import {BannerComponent} from './banner/banner.component';
import {MaterialModule} from '@shared';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
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
