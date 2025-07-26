import {
  MatFormFieldModule
} from "./chunk-IZA35RKZ.js";
import {
  MAT_ERROR,
  MAT_FORM_FIELD,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MAT_PREFIX,
  MAT_SUFFIX,
  MatError,
  MatFormField,
  MatFormFieldControl,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix,
  getMatFormFieldDuplicatedHintError,
  getMatFormFieldMissingControlError,
  getMatFormFieldPlaceholderConflictError
} from "./chunk-6NU6XEFB.js";
import "./chunk-X4KGH7HV.js";
import "./chunk-QWQBU7IF.js";
import "./chunk-IBYU652R.js";
import "./chunk-ISL5ABI3.js";
import "./chunk-VXO53X7X.js";
import "./chunk-WUQ2GN3V.js";
import "./chunk-MADP5KZN.js";
import "./chunk-2C65AWAI.js";
import "./chunk-DI2MOMEL.js";
import "./chunk-4ZUN4BK3.js";
import "./chunk-DG6N4IH3.js";
import "./chunk-2O4WY5GE.js";
import "./chunk-B6RGOUGM.js";
import "./chunk-5YCRTAGZ.js";
import "./chunk-GWXRPDJE.js";
import "./chunk-F7IXPITU.js";
import "./chunk-3LEVPBF4.js";
import "./chunk-W2FR2VSW.js";
import "./chunk-KHHKFGFH.js";
import "./chunk-KBUIKKCC.js";

// node_modules/@angular/material/fesm2022/form-field.mjs
var matFormFieldAnimations = {
  // Represents:
  // trigger('transitionMessages', [
  //   // TODO(mmalerba): Use angular animations for label animation as well.
  //   state('enter', style({opacity: 1, transform: 'translateY(0%)'})),
  //   transition('void => enter', [
  //     style({opacity: 0, transform: 'translateY(-5px)'}),
  //     animate('300ms cubic-bezier(0.55, 0, 0.55, 0.2)'),
  //   ]),
  // ])
  /** Animation that transitions the form field's error and hint messages. */
  transitionMessages: {
    type: 7,
    name: "transitionMessages",
    definitions: [{
      type: 0,
      name: "enter",
      styles: {
        type: 6,
        styles: {
          opacity: 1,
          transform: "translateY(0%)"
        },
        offset: null
      }
    }, {
      type: 1,
      expr: "void => enter",
      animation: [{
        type: 6,
        styles: {
          opacity: 0,
          transform: "translateY(-5px)"
        },
        offset: null
      }, {
        type: 4,
        styles: null,
        timings: "300ms cubic-bezier(0.55, 0, 0.55, 0.2)"
      }],
      options: null
    }],
    options: {}
  }
};
export {
  MAT_ERROR,
  MAT_FORM_FIELD,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MAT_PREFIX,
  MAT_SUFFIX,
  MatError,
  MatFormField,
  MatFormFieldControl,
  MatFormFieldModule,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix,
  getMatFormFieldDuplicatedHintError,
  getMatFormFieldMissingControlError,
  getMatFormFieldPlaceholderConflictError,
  matFormFieldAnimations
};
//# sourceMappingURL=@angular_material_form-field.js.map
