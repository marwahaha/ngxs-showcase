import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {MaterialModule} from './shared/material/material.module';
import {CoreModule} from './core/core.module';
import {RouterModule, Routes} from '@angular/router';
import {NgxsModule} from '@ngxs/store';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgxsFormPluginModule} from './shared/ngxs/form.module';

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
    NoopAnimationsModule,
    MaterialModule,
    CoreModule,
    RouterModule.forRoot(appRoutes),
    NgxsModule.forRoot([]),
    NgxsFormPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
