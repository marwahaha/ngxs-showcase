import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonsComponent} from './persons.component';
import {Person} from './models/person.model';
import {MatCardModule, MatIconModule, MatListModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxsModule, Store} from '@ngxs/store';
import {MainState} from '../../core/store/states/main-state';
import {InitMainState} from '../../core/store/actions/main-state.actions';

describe('PersonsComponent', () => {
  let component: PersonsComponent;
  let fixture: ComponentFixture<PersonsComponent>;
  const expectedPerson: Person[] = [{id: 1, name: "premier", forename: "1"}, {id: 2, name: "seconde", forename: "2"}];
  let store: Store;

  setupTestBed({
    declarations: [PersonsComponent],
    imports: [
      MatCardModule,
      MatListModule,
      MatIconModule,
      RouterTestingModule,
      NgxsModule.forRoot([MainState])
    ],
    providers: []
  });

  beforeEach(() => {
    TestBed.compileComponents();
    store = TestBed.get(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async((done) => {
      expect(component).toBeTruthy();
    store.dispatch(new InitMainState(expectedPerson));
      let persons: Person[] = [];
      component.persons$.subscribe(
        (person) => persons.push(person),
        (error) => done.fail(error),
        () => expect(persons).toEqual(expectedPerson)
      );
    })
  );
});
