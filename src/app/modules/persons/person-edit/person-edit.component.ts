import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

  personForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.personForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),
      'forename': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),
      'birthDate': new FormControl(null)
      // TODO create a custom validator for a date in the past
    });
  }

  onSubmit() {
    console.log(this.personForm);
  }

}
