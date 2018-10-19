import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {MaterialModule} from './commons/material/material.module';
import {CoreModule} from './core/core.module';
import {PersonsModule} from './modules/persons/persons.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    CoreModule,
    PersonsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
