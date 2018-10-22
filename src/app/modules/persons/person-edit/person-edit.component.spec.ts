import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonEditComponent} from './person-edit.component';
import {MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('PersonEditComponent', () => {
  let component: PersonEditComponent;
  let fixture: ComponentFixture<PersonEditComponent>;

  setupTestBed({
    imports: [
      ReactiveFormsModule,
      MatInputModule,
      MatButtonModule,
      MatDatepickerModule,
      MatFormFieldModule,
      MatMomentDateModule,
      NoopAnimationsModule
    ],
    declarations: [PersonEditComponent]
  });

  beforeEach(async(() => {
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and be invalid', () => {
    expect(component).toBeTruthy();
    expect(component.personForm.valid).toBe(false);
  });
});
