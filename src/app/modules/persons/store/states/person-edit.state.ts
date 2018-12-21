import {Action, Selector, State, StateContext} from '@ngxs/store';
import {PersonEditStateModel} from '../models/person-edit-state.model';
import {FormAdded, FormSaved} from '../actions/person-edit-state.actions';
import {Person} from '../../../../models/person.model';
import {AddPerson, ModifyPerson} from '../actions/persons-state.actions';

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

  @Action(FormAdded)
  formAdded(ctx: StateContext<PersonEditStateModel>) {
    const model = ctx.getState().personEditForm.model;
    console.log(`Person to Add : ${JSON.stringify(model)}`);
    ctx.dispatch(new AddPerson(this.mapContentFormToPerson(model)));
  }

  @Action(FormSaved)
  formSaved(ctx: StateContext<PersonEditStateModel>) {
    const model = ctx.getState().personEditForm.model;
    console.log(`Modified Person : ${JSON.stringify(model)}`);
    ctx.dispatch(new ModifyPerson(this.mapContentFormToPerson(model)));
  }

  private mapContentFormToPerson(model): Person {
    return {
      id: model.id,
      name: model.name,
      forename: model.forename
    };
  }
}
