import {Selector, State} from '@ngxs/store';
import {PersonEditStateModel} from '../models/person-edit-state.model';

@State<PersonEditStateModel>({
  name: 'personEdit',
  // Those default are needed by the directive, it is a subselection of FormGroup
  defaults: {
    personEditForm: {
      model: {},
      dirty: false,
      status: '',
      errors: {}
    }
  }
})
export class PersonEditState {

  @Selector()
  static getModel(state: any) {
    return state.personEditForm.model;
  }
}
