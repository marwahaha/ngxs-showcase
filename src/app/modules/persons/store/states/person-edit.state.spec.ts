import {NgxsModule, Store} from '@ngxs/store';
import {PersonEditState} from './person-edit.state';
import {async, TestBed} from '@angular/core/testing';
import {UpdateFormValue} from '../../../../shared/ngxs/actions';
import {NgxsFormPluginModule} from '../../../../shared/ngxs/form.module';

describe('PersonEditState', () => {

  const store: Store;

  setupTestBed(
    {
      imports: [
        NgxsModule.forRoot([PersonEditState]),
        NgxsFormPluginModule.forRoot()
      ]
    }
  );

  beforeEach(async(() => {
    store = TestBed.get(Store);
  }));

  describe('getModel selector', () => {

    it('should be empty', () => {
      store.selectOnce(state => state.personEdit.personEditForm.model).subscribe(
        model => expect(model).toEqual({})
      );
    });

    it('should return the model part of the state', () => {
      const expectedValue = {
        value: 'test'
      };
      store.dispatch(new UpdateFormValue({
        value: expectedValue,
        path: 'personEdit.personEditForm'
      }));
      store.selectOnce(PersonEditState.getModel).subscribe(
        model => expect(model).toEqual(expectedValue)
      );
    });

  });

});
