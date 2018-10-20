import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonEditComponent} from './person-edit.component';

describe('PersonEditComponent', () => {
  let component: PersonEditComponent;
  let fixture: ComponentFixture<PersonEditComponent>;

  setupTestBed({
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
