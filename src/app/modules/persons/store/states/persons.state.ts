import {Action, Selector, State, StateContext} from '@ngxs/store';
import {PersonsStateModel} from '../models/persons-state.model';
import {InitPersonsState, ModifyPerson} from '../actions/persons-state.actions';
import {Person} from '../../models/person.model';


@State<PersonsStateModel>({
  name: 'persons',
  defaults: {
    persons: [],
    loaded: false
  }
})
export class PersonsState {

  @Selector()
  static persons(state: PersonsStateModel): Person[] {
    return state.persons;
  }

  // In version 3 you should use a snapshot selector
  @Selector()
  static isLoaded(state: PersonsStateModel): boolean {
    return state.loaded;
  }

  @Action(InitPersonsState)
  initState(ctx: StateContext<PersonsStateModel>, action: InitPersonsState) {
    console.log('Received InitState action');
    ctx.setState({
      persons: action.persons,
      loaded: true
    });
  }

  @Action(ModifyPerson)
  modifyPerson(ctx: StateContext<PersonsStateModel>, action: ModifyPerson) {
    console.log(`Received this modified person ${JSON.stringify(action.person)}`);
    const updatedPersons = ctx.getState().persons;
    const updatePerson = updatedPersons.find((person) => person.id === action.person.id);
    const index = updatedPersons.indexOf(updatePerson);
    if (index === -1) {
      throw new Error(`The person with ID :${action.person.id} is not loaded ! `)
    }
    updatedPersons[index] = action.person;
    ctx.patchState({persons: updatedPersons});
    console.log(ctx.getState().persons);
  }

}
