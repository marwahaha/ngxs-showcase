import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonsComponent} from './persons.component';
import {Person} from './models/person.model';
import {MatCardModule, MatIconModule, MatListModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxsModule, Store} from '@ngxs/store';
import {PersonsStateState} from './store/states/persons-state.state';
import {InitMainState} from './store/actions/main-state.actions';

describe('PersonsComponent', () => {
  let component: PersonsComponent;
  let fixture: ComponentFixture<PersonsComponent>;
  const expectedPerson: Person[] = [{id: 1, name: 'premier', forename: '1'}, {id: 2, name: 'second', forename: '2'}];
  let store: Store;

  setupTestBed({
    declarations: [PersonsComponent],
    imports: [
      MatCardModule,
      MatListModule,
      MatIconModule,
      RouterTestingModule,
      NgxsModule.forRoot([PersonsStateState])
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
    const persons: Person[] = [];
      component.persons$.subscribe(
        (person) => persons.push(person),
        (error) => done.fail(error),
        () => expect(persons).toEqual(expectedPerson)
      );
    })
  );
});
