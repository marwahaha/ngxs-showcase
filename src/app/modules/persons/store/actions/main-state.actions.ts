import {Person} from '../../models/person.model';

export class InitPersonsState {
  static readonly type = '[Person Service] Init Main State';

  constructor(public persons: Person[]) {
  }
}
