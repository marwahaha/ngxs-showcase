import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonsComponent} from './persons.component';
import {PersonService} from './service/person.service';
import {Observable} from 'rxjs';
import {Person} from './models/person.model';
import {MatCardModule, MatIconModule, MatListModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';

describe('PersonsComponent', () => {
  let component: PersonsComponent;
  let fixture: ComponentFixture<PersonsComponent>;
  const ExpectedPerson: Person[] = [{id: 1, name: "premier", forename: "1"}, {id: 2, name: "seconde", forename: "2"}]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonsComponent],
      imports: [
        MatCardModule,
        MatListModule,
        MatIconModule,
        RouterTestingModule
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
