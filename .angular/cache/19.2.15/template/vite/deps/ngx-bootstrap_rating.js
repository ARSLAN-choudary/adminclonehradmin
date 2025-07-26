import {
  NG_VALUE_ACCESSOR
} from "./chunk-7WCY2JOW.js";
import {
  NgForOf,
  NgTemplateOutlet
} from "./chunk-F7IXPITU.js";
import "./chunk-3LEVPBF4.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Injectable,
  Input,
  NgModule,
  Output,
  forwardRef,
  setClassMetadata,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-W2FR2VSW.js";
import "./chunk-KHHKFGFH.js";
import "./chunk-KBUIKKCC.js";

// node_modules/ngx-bootstrap/rating/fesm2022/ngx-bootstrap-rating.mjs
var _c0 = (a0, a1) => ({
  index: a0,
  value: a1
});
function RatingComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const value_r2 = ctx.value;
    const index_r3 = ctx.index;
    ɵɵtextInterpolate(index_r3 < value_r2 ? "★" : "☆");
  }
}
function RatingComponent_ng_template_3_ng_template_3_Template(rf, ctx) {
}
function RatingComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 3);
    ɵɵtext(1);
    ɵɵelementEnd();
    ɵɵelementStart(2, "span", 4);
    ɵɵlistener("mouseenter", function RatingComponent_ng_template_3_Template_span_mouseenter_2_listener() {
      const index_r5 = ɵɵrestoreView(_r4).index;
      const ctx_r5 = ɵɵnextContext();
      return ɵɵresetView(ctx_r5.enter(index_r5 + 1));
    })("click", function RatingComponent_ng_template_3_Template_span_click_2_listener() {
      const index_r5 = ɵɵrestoreView(_r4).index;
      const ctx_r5 = ɵɵnextContext();
      return ɵɵresetView(ctx_r5.rate(index_r5 + 1));
    });
    ɵɵtemplate(3, RatingComponent_ng_template_3_ng_template_3_Template, 0, 0, "ng-template", 5);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const r_r7 = ctx.$implicit;
    const index_r5 = ctx.index;
    const ctx_r5 = ɵɵnextContext();
    const star_r8 = ɵɵreference(2);
    ɵɵadvance();
    ɵɵtextInterpolate1("(", index_r5 < ctx_r5.value ? "*" : " ", ")");
    ɵɵadvance();
    ɵɵstyleProp("cursor", ctx_r5.readonly ? "default" : "pointer");
    ɵɵclassProp("active", index_r5 < ctx_r5.value);
    ɵɵproperty("title", r_r7.title);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r5.customTemplate || star_r8)("ngTemplateOutletContext", ɵɵpureFunction2(8, _c0, index_r5, ctx_r5.value));
  }
}
var RatingConfig = class _RatingConfig {
  constructor() {
    this.ariaLabel = "rating";
  }
  static {
    this.ɵfac = function RatingConfig_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RatingConfig)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _RatingConfig,
      factory: _RatingConfig.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RatingConfig, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var RATING_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RatingComponent),
  multi: true
};
var RatingComponent = class _RatingComponent {
  constructor(changeDetection, config) {
    this.changeDetection = changeDetection;
    this.max = 5;
    this.readonly = false;
    this.titles = [];
    this.onHover = new EventEmitter();
    this.onLeave = new EventEmitter();
    this.onChange = Function.prototype;
    this.onTouched = Function.prototype;
    this.ariaLabel = "rating";
    this.range = [];
    this.value = 0;
    Object.assign(this, config);
  }
  onKeydown(event) {
    if ([37, 38, 39, 40].indexOf(event.which) === -1) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const sign = event.which === 38 || event.which === 39 ? 1 : -1;
    this.rate(this.value + sign);
  }
  ngOnInit() {
    this.max = this.max || 5;
    this.titles = typeof this.titles !== "undefined" && this.titles.length > 0 ? this.titles : [];
    this.range = this.buildTemplateObjects(this.max);
  }
  // model -> view
  writeValue(value) {
    if (value % 1 !== value) {
      this.value = Math.round(value);
      this.preValue = value;
      this.changeDetection.markForCheck();
      return;
    }
    this.preValue = value;
    this.value = value;
    this.changeDetection.markForCheck();
  }
  enter(value) {
    if (!this.readonly) {
      this.value = value;
      this.changeDetection.markForCheck();
      this.onHover.emit(value);
    }
  }
  reset() {
    if (typeof this.preValue === "number") {
      this.value = Math.round(this.preValue);
      this.changeDetection.markForCheck();
      this.onLeave.emit(this.value);
    }
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  rate(value) {
    if (!this.readonly && this.range && value >= 0 && value <= this.range.length) {
      this.writeValue(value);
      this.onChange(value);
    }
  }
  buildTemplateObjects(max) {
    const result = [];
    for (let i = 0; i < max; i++) {
      result.push({
        index: i,
        title: this.titles[i] || i + 1
      });
    }
    return result;
  }
  static {
    this.ɵfac = function RatingComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RatingComponent)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(RatingConfig));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _RatingComponent,
      selectors: [["rating"]],
      hostBindings: function RatingComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("keydown", function RatingComponent_keydown_HostBindingHandler($event) {
            return ctx.onKeydown($event);
          });
        }
      },
      inputs: {
        max: "max",
        readonly: "readonly",
        titles: "titles",
        customTemplate: "customTemplate"
      },
      outputs: {
        onHover: "onHover",
        onLeave: "onLeave"
      },
      features: [ɵɵProvidersFeature([RATING_CONTROL_VALUE_ACCESSOR])],
      decls: 4,
      vars: 4,
      consts: [["star", ""], ["tabindex", "0", "role", "slider", "aria-valuemin", "0", 3, "mouseleave", "keydown"], ["ngFor", "", 3, "ngForOf"], [1, "sr-only", "visually-hidden"], [1, "bs-rating-star", 3, "mouseenter", "click", "title"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"]],
      template: function RatingComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = ɵɵgetCurrentView();
          ɵɵelementStart(0, "span", 1);
          ɵɵlistener("mouseleave", function RatingComponent_Template_span_mouseleave_0_listener() {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.reset());
          })("keydown", function RatingComponent_Template_span_keydown_0_listener($event) {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.onKeydown($event));
          });
          ɵɵtemplate(1, RatingComponent_ng_template_1_Template, 1, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor)(3, RatingComponent_ng_template_3_Template, 4, 11, "ng-template", 2);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵattribute("aria-label", ctx.ariaLabel)("aria-valuemax", ctx.range.length)("aria-valuenow", ctx.value);
          ɵɵadvance(3);
          ɵɵproperty("ngForOf", ctx.range);
        }
      },
      dependencies: [NgForOf, NgTemplateOutlet],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RatingComponent, [{
    type: Component,
    args: [{
      selector: "rating",
      providers: [RATING_CONTROL_VALUE_ACCESSOR],
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [NgForOf, NgTemplateOutlet],
      template: `<span (mouseleave)="reset()" (keydown)="onKeydown($event)" tabindex="0"
      role="slider" aria-valuemin="0"
      [attr.aria-label]="ariaLabel"
      [attr.aria-valuemax]="range.length"
      [attr.aria-valuenow]="value">
  <ng-template #star let-value="value" let-index="index">{{ index < value ? '&#9733;' : '&#9734;' }}</ng-template>
  <ng-template ngFor let-r [ngForOf]="range" let-index="index">
    <span class="sr-only visually-hidden">({{ index < value ? '*' : ' ' }})</span>
    <span class="bs-rating-star"
          (mouseenter)="enter(index + 1)"
          (click)="rate(index + 1)"
          [title]="r.title"
          [style.cursor]="readonly ? 'default' : 'pointer'"
          [class.active]="index < value">
      <ng-template [ngTemplateOutlet]="customTemplate || star"
                   [ngTemplateOutletContext]="{index: index, value: value}">
      </ng-template>
    </span>
  </ng-template>
</span>
`
    }]
  }], () => [{
    type: ChangeDetectorRef
  }, {
    type: RatingConfig
  }], {
    max: [{
      type: Input
    }],
    readonly: [{
      type: Input
    }],
    titles: [{
      type: Input
    }],
    customTemplate: [{
      type: Input
    }],
    onHover: [{
      type: Output
    }],
    onLeave: [{
      type: Output
    }],
    onKeydown: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }]
  });
})();
var RatingModule = class _RatingModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot() {
    return {
      ngModule: _RatingModule,
      providers: []
    };
  }
  static {
    this.ɵfac = function RatingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RatingModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _RatingModule,
      imports: [RatingComponent],
      exports: [RatingComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RatingModule, [{
    type: NgModule,
    args: [{
      imports: [RatingComponent],
      exports: [RatingComponent]
    }]
  }], null, null);
})();
export {
  RatingComponent,
  RatingConfig,
  RatingModule
};
//# sourceMappingURL=ngx-bootstrap_rating.js.map
