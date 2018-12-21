import {Action, Selector, State, StateContext} from '@ngxs/store';
import {PersonsStateModel} from '../models/persons-state.model';
import {AddPerson, EditionCanceled, InitPersonsState, ModifyPerson, OpenAddingMode} from '../actions/persons-state.actions';
import {Person} from '../../../../models/person.model';
import {PersonUnselected} from '../../../../core/store/actions/app-state.actions';


@State<PersonsStateModel>({
  name: 'persons',
  defaults: {
    persons: [],
    loaded: false,
    maxId: 0,
    addingMode: false
  }
})
export class PersonsState {

  @Selector()
  static getPersons(state: PersonsStateModel): Person[] {
    return state.persons;
  }

  @Selector()
  static isAddingMode(state: PersonsStateModel): boolean {
    return state.addingMode;
  }

  // In version 3 you should use a snapshot selector
  @Selector()
  static isLoaded(state: PersonsStateModel): boolean {
    return state.loaded;
  }

  @Selector()
  static findPerson(state: PersonsStateModel): (id) => Person {
    return (id: number) => {
      return state.persons.filter(person => person.id === id)[0];
    };
  }

  @Action(InitPersonsState)
  initState(ctx: StateContext<PersonsStateModel>, action: InitPersonsState) {
    console.log('Received InitState action');
    ctx.setState({
      persons: action.persons,
      loaded: true,
      maxId: Math.max.apply(Math, action.persons.map((o) => o.id)),
      addingMode: false
    });
    console.log(`The state is now : ${JSON.stringify(ctx.getState())}`);
  }

  @Action(ModifyPerson)
  modifyPerson(ctx: StateContext<PersonsStateModel>, action: ModifyPerson) {
    console.log(`Received this modified person ${JSON.stringify(action.person)}`);
    const updatedPersons = ctx.getState().persons;
    const updatePerson = updatedPersons.find((person) => person.id === action.person.id);
    const index = updatedPersons.indexOf(updatePerson);
    if (index === -1) {
      throw new Error(`The person with ID :${action.person.id} is not loaded ! `);
    }
    updatedPersons[index] = action.person;
    ctx.patchState({persons: updatedPersons});
    console.log(ctx.getState().persons);
    ctx.dispatch(new PersonUnselected());
  }

  @Action(AddPerson)
  addPerson(ctx: StateContext<PersonsStateModel>, action: AddPerson) {
    console.log(`Received this new person ${JSON.stringify(action.person)}`);
    const newPerson = action.person;
    newPerson.id = ctx.getState().maxId + 1;
    const tmpPersons = ctx.getState().persons;
    tmpPersons.push(newPerson);
    ctx.patchState({persons: tmpPersons, maxId: newPerson.id, addingMode: false});
  }

  @Action(OpenAddingMode)
  openAddingMode(ctx: StateContext<PersonsStateModel>) {
    ctx.patchState({addingMode: true});
  }

  @Action(EditionCanceled)
  onEditionCanceled(ctx: StateContext<PersonsStateModel>) {
    ctx.patchState({addingMode: false});
    ctx.dispatch(new PersonUnselected());
  }

}
