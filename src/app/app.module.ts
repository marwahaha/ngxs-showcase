import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {MaterialModule} from './shared/material/material.module';
import {CoreModule} from './core/core.module';
import {RouterModule, Routes} from '@angular/router';
import {NgxsModule} from '@ngxs/store';

const appRoutes: Routes = [
  {
    path: 'persons',
    loadChildren: './modules/persons/persons.module#PersonsModule'
  },
  {
    path: '**',
    redirectTo: 'persons'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    CoreModule,
    RouterModule.forRoot(appRoutes),
    NgxsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
