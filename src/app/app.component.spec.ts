import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {PersonsModule} from './modules/persons/persons.module';
import {MaterialModule} from './commons/material/material.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        CoreModule,
        PersonsModule,
        MaterialModule
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
