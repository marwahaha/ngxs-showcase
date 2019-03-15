export interface FormContent {
  model: any;
  dirty: boolean;
  status: string;
  errors: any;
}

export interface PersonEditStateModel {
  personEditForm: FormContent;
}
