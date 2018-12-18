import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {PersonsModule} from './modules/persons/persons.module';
import {MaterialModule} from './shared/material/material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxsModule} from '@ngxs/store';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('AppComponent', () => {

  setupTestBed({
    declarations: [
      AppComponent
    ],
    imports: [
      CoreModule,
      PersonsModule,
      MaterialModule,
      NoopAnimationsModule,
      RouterTestingModule,
      NgxsModule.forRoot([])
    ]
  });

  beforeEach(() => {
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
