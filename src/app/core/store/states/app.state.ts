import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AppStateModel} from './app-state.model';
import {PersonSelected, PersonUnselected} from './app-state.actions';
import {Person} from '../../../models/person.model';

@State<AppStateModel>({
  name: 'main',
  defaults: {}
})
export class AppState {

  @Selector()
  static getSelectedPerson(state: AppStateModel): Person {
    return state.selectedPerson;
  }

  @Action(PersonSelected)
  setSelectedPerson(ctx: StateContext<AppStateModel>, action: PersonSelected) {
    ctx.patchState({selectedPerson: action.person});
  }

  @Action(PersonUnselected)
  unsetSelectedPerson(ctx: StateContext<AppStateModel>) {
    ctx.setState({});
  }

}
