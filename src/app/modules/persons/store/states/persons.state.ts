import {Action, Selector, State, StateContext} from '@ngxs/store';
import {PersonsStateModel} from '../models/persons-state.model';
import {InitPersonsState, ModifyPerson, NewPerson, SelectPerson} from '../actions/persons-state.actions';
import {Person} from '../../models/person.model';


@State<PersonsStateModel>({
  name: 'persons',
  defaults: {
    persons: [],
    loaded: false,
    maxId: 0
  }
})
export class PersonsState {

  @Selector()
  static selectedPerson(state: PersonsStateModel): Person {
    return state.selectedPerson;
  }

  @Selector()
  static persons(state: PersonsStateModel): Person[] {
    return state.persons;
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
      maxId: Math.max.apply(Math, action.persons.map((o) => o.id))
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
  }

  @Action(NewPerson)
  newPerson(ctx: StateContext<PersonsStateModel>, action: NewPerson) {
    console.log(`Received this new person ${JSON.stringify(action.person)}`);
    const newPerson = action.person;
    newPerson.id = ctx.getState().maxId + 1;
    const tmpPersons = ctx.getState().persons;
    tmpPersons.push(newPerson);
    ctx.patchState({persons: tmpPersons, maxId: newPerson.id})
  }

  @Action(SelectPerson)
  selectPerson(ctx: StateContext<PersonsStateModel>, action: SelectPerson) {
    if (ctx.getState().persons.find((person) => person.id === action.person.id)) {
      ctx.patchState({selectedPerson: action.person});
    } else {
      throw new Error(`The person with ID :${action.person.id} is not loaded ! `);
    }
  }

}
