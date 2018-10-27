/**
 * Imported from https://github.com/ngxs/store/blob/v3.2.0/packages/form-plugin/src/form.plugin.ts
 */
import {Injectable} from '@angular/core';
import {NgxsPlugin, setValue, getActionTypeFromInstance} from '@ngxs/store';
import {
  UpdateForm, UpdateFormDirty, UpdateFormErrors,
  UpdateFormStatus, UpdateFormValue, SetFormDirty, SetFormDisabled,
  SetFormEnabled, SetFormPristine
} from './actions';

@Injectable()
export class NgxsFormPlugin implements NgxsPlugin {
  constructor() {
  }

  handle(state, event, next) {
    const type = getActionTypeFromInstance(event);
    console.log(`Form plugin received action of type : ${type}`);

    let nextState = state;

    if (type === UpdateFormValue.type || type === UpdateForm.type) {
      nextState = setValue(nextState, `${event.payload.path}.model`, {
        ...event.payload.value
      });
    }

    if (type === UpdateFormStatus.type || type === UpdateForm.type) {
      nextState = setValue(nextState, `${event.payload.path}.status`, event.payload.status);
    }

    if (type === UpdateFormErrors.type || type === UpdateForm.type) {
      nextState = setValue(nextState, `${event.payload.path}.errors`, {
        ...event.payload.errors
      });
    }

    if (type === UpdateFormDirty.type || type === UpdateForm.type) {
      nextState = setValue(nextState, `${event.payload.path}.dirty`, event.payload.dirty);
    }

    if (type === SetFormDirty.type) {
      nextState = setValue(nextState, `${event.payload}.dirty`, true);
    }

    if (type === SetFormPristine.type) {
      nextState = setValue(nextState, `${event.payload}.dirty`, false);
    }

    if (type === SetFormDisabled.type) {
      nextState = setValue(nextState, `${event.payload}.disabled`, true);
    }

    if (type === SetFormEnabled.type) {
      nextState = setValue(nextState, `${event.payload}.disabled`, false);
    }

    return next(nextState, event);
  }
}