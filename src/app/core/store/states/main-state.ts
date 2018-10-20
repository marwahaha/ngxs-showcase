import {Action, Selector, State, StateContext} from '@ngxs/store';
import {PersonStateModel} from '../models/person-state.model';
import {InitMainState} from '../actions/main-state.actions';


@State<PersonStateModel>({
  name: 'persons',
  defaults: {
    persons: []
  }
})
export class MainState {

  @Selector()
  static persons(state: PersonStateModel) {
    return state.persons;
  }

  @Action(InitMainState)
  initState(ctx: StateContext<PersonStateModel>, action: InitMainState) {
    console.log('Init Main State');
    ctx.setState({
      persons: action.persons,
    });
  }

}
