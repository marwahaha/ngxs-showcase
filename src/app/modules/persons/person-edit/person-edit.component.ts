import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Select, Store} from '@ngxs/store';
import 'rxjs/add/observable/from';
import {PersonService} from '../services/person.service';
import {PersonEditState} from '../store/states/person-edit.state';
import {ModifyPerson} from '../store/actions/persons-state.actions';
import {PersonsState} from '../store/states/persons.state';
import {first, map} from 'rxjs/operators';
import {Person} from '../models/person.model';
import {UpdateForm} from '@shared';
import {Observable} from 'rxjs';

@Component({
  selector: 'person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit, OnDestroy {

  @Select(PersonEditState.getModel)
  formModel$: Observable<any>;

  personForm: FormGroup;

  private formSubscription: Subscription;

  constructor(private activeRoute: ActivatedRoute, private store: Store, private service: PersonService, private router: Router) {

  }

  ngOnInit() {
    // load person if not yet done
    this.service.loadPersons();
    // create the reactive form
    this.personForm = new FormGroup({
      'id': new FormControl(null),
      'name': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),
      'forename': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),
      'birthDate': new FormControl(null)
      // TODO create a custom validator for a date in the past
    });
    // Read the id from the URL and find the corresponding person in the store
    const idParam = parseInt(this.activeRoute.snapshot.params['id']);
    this.store.select(PersonsState.findPerson)
      .pipe(
        map(filterFn => filterFn(idParam)),
        first()
      )
      .subscribe(
        (person: Person) => {
          console.log(`Person to edit in the form : ${JSON.stringify(person)}`);
          // Map the found person to the form
          this.personForm.patchValue({
            id: person.id,
            name: person.name,
            forename: person.forename,
          });
        }
      );
  }

  onSave() {
    // map the value to a Person and dispatch an action
    this.formSubscription = this.formModel$.subscribe(
      model => {
        console.log(`Person Model to Save : ${JSON.stringify(model)}`);
        this.store.dispatch(new ModifyPerson({
          id: model.id,
          name: model.name,
          forename: model.forename
        }));
        this.router.navigate(['/persons']);
      }
    );
  }

  ngOnDestroy(): void {
    // close the observable subscriptions
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
    // reset the form
    this.store.dispatch(new UpdateForm({
      path: 'personEdit.personEditForm',
      value: null,
      dirty: null,
      status: null,
      errors: null
    }));
  }

  onCancel() {
    this.router.navigate(['/persons']);
  }
}
