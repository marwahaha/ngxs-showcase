import {Action, Selector, State, StateContext} from '@ngxs/store';
import {PersonStateModel} from '../models/person-state.model';
import {InitMainState} from '../actions/main-state.actions';
import {Person} from '../../models/person.model';


@State<PersonStateModel>({
  name: 'persons',
  defaults: {
    persons: []
  }
})
export class PersonsState {

  @Selector()
  static persons(state: PersonStateModel): Person[] {
    return state.persons;
  }

  @Action(InitMainState)
  initState(ctx: StateContext<PersonStateModel>, action: InitMainState) {
    console.log("Received InitState action");
    ctx.setState({
      persons: action.persons,
    });
  }

}
