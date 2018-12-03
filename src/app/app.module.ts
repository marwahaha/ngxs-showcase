import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {MaterialModule, NgxsFormPluginModule} from '@shared';
import {CoreModule} from '@core';
import {RouterModule, Routes} from '@angular/router';
import {NgxsModule} from '@ngxs/store';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AppState} from './shared/store/states/app.state';

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
    NgxsModule.forRoot([AppState]),
    NgxsFormPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
