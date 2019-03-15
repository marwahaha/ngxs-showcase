import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppState } from './core/store/states/app.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { SharedModule } from './shared/shared.module';

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
  declarations: [AppComponent],
  imports: [
    NoopAnimationsModule,
    SharedModule,
    RouterModule.forRoot(appRoutes),
    NgxsModule.forRoot([AppState]),
    NgxsFormPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
