import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonsComponent} from './persons.component';
import {PersonService} from './service/person.service';
import {Observable} from 'rxjs';
import {Person} from './models/person.model';
import {MatCardModule, MatListModule} from '@angular/material';

describe('PersonsComponent', () => {
  let component: PersonsComponent;
  let fixture: ComponentFixture<PersonsComponent>;
  const ExpectedPerson: Person[] = [{name: "premier"}, {name: "seconde"}]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonsComponent],
      imports: [
        MatCardModule,
        MatListModule
      ],
      providers: [
        {
          provide: PersonService,
          useValue: {
            getPersons: jest.fn(() => Observable.from(ExpectedPerson).distinct())
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.persons).toEqual(ExpectedPerson);
  });
});
