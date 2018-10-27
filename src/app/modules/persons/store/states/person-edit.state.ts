import {State} from '@ngxs/store';

@State({
  name: 'person-form',
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


}
