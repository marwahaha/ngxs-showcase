import {Action, Selector, State, StateContext} from '@ngxs/store';
import {PersonStateModel} from '../models/person-state.model';
import {InitPersonsState} from '../actions/persons-state.actions';
import {Person} from '../../models/person.model';


@State<PersonStateModel>({
  name: 'persons',
  defaults: {
    persons: [],
    loaded: false
  }
})
export class PersonsState {

  @Selector()
  static persons(state: PersonStateModel): Person[] {
    return state.persons;
  }

  // In version 3 you should use a snapshot selector
  @Selector()
  static isLoaded(state: PersonStateModel): boolean {
    return state.loaded;
  }

  @Action(InitPersonsState)
  initState(ctx: StateContext<PersonStateModel>, action: InitPersonsState) {
    console.log('Received InitState action');
    ctx.setState({
      persons: action.persons,
      loaded: true
    });
  }

}
