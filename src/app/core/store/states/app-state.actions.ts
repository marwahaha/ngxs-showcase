import { Person } from '../../../models/person.model';

export class PersonSelected {
  static readonly type = '[Persons] Person Selected';

  constructor(public person: Person) {}
}

export class PersonUnselected {
  static readonly type = '[Persons] Person Unselected';
}
