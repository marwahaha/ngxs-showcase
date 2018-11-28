import {Person} from '../../models/person.model';

export class InitPersonsState {
  static readonly type = '[Person Service] Init Main State';

  constructor(public persons: Person[]) {
  }
}

export class ModifyPerson {
  static readonly type = '[Person Edit Form] Modifiy Person';

  constructor(public person: Person) {

  }
}

export class NewPerson {
  static readonly type = '[Person Edit Form] New Person'

  constructor(public person: Person) {

  }
}
