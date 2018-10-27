import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {Person} from '../models/person.model';
import {PersonsState} from '../store/states/persons.state';
import {flatMap} from 'rxjs/operators';
import 'rxjs/add/observable/from';
import {PersonService} from '../services/person.service';
import {PersonEditState} from '../store/states/person-edit.state';
import {ModifyPerson} from '../store/actions/persons-state.actions';
import {MatGridTileFooterCssMatStyler} from '@angular/material';

@Component({
  selector: 'person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit, OnDestroy {

  @Select(PersonEditState.getModel)
  formModel$;

  personForm: FormGroup;

  private routeSubscription: Subscription;

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
    this.routeSubscription = this.activeRoute.params.subscribe(
      (params) => (<Observable<Person>>this.store.select(PersonsState.persons)
        .pipe(
          flatMap((persons) => {
              console.log(persons);
              console.log(`id = ${params['id']}`);
              const tmp = persons.filter((person: Person) => person.id === parseInt(params['id']));
              console.log(tmp);
              return tmp;
            }
          )
        ))
        .subscribe(
          person => {
            console.log(`Person to edit from the store : ${JSON.stringify(person)}`);
            // Map the found person to the form
            this.personForm.patchValue({
              id: person.id,
              name: person.name,
              forename: person.forename,
            });
          }
        )
    );

  }

  onSave() {
    // map the value to a Person and dispatch an action
    this.formModel$.subscribe(
      model => {
        console.log(`Person Model to Save : ${JSON.stringify(model)}`)
        this.store.dispatch(new ModifyPerson({
          id: model.id,
          name: model.name,
          forename: model.forename
        }));
        this.router.navigate(['/persons'])
      }
    )
  }

  ngOnDestroy(): void {
    // close the observable subscriptions
    this.routeSubscription.unsubscribe();
  }
}
