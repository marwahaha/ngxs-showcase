import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BannerComponent} from './banner/banner.component';
import {MaterialModule} from '@shared';
import {SideMenuComponent} from './side-menu/side-menu.component';

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
