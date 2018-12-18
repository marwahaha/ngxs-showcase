import {Person} from '../../../../models/person.model';

export interface PersonsStateModel {
  persons: Person[];
  loaded: boolean;
  maxId: number;
  addingMode: boolean;
}
