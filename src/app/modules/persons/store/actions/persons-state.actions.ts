import {Person} from '../../../../models/person.model';

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

//TODO rename to AddPerson
export class AddPerson {
  static readonly type = '[Person Edit Form] New Person';

  constructor(public person: Person) {

  }
}

export class OpenAddingMode {
  static readonly type = '[Persons] Open Adding Mode';
}

export class EditionCanceled {
  static readonly type = '[Edit Person Form] Person Modification Canceled';
}
