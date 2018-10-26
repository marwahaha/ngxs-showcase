/**
 * Imported from https://github.com/ngxs/store/blob/v3.2.0/packages/form-plugin/src/form.module.ts
 */

import {NgModule, ModuleWithProviders} from '@angular/core';
import {NGXS_PLUGINS} from '@ngxs/store';
import {NgxsFormPlugin} from './form.plugin';
import {ReactiveFormsModule} from '@angular/forms';
import {MyNgxsFormDirective} from './my-ngxs-form.directive';

@NgModule({
  imports: [ReactiveFormsModule],
  declarations: [MyNgxsFormDirective],
  exports: [MyNgxsFormDirective]
})
export class NgxsFormPluginModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxsFormPluginModule,
      providers: [
        {
          provide: NGXS_PLUGINS,
          useClass: NgxsFormPlugin,
          multi: true
        }
      ]
    };
  }
}
