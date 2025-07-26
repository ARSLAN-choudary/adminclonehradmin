import{G as w,W as M,X as F,Y as k}from"./chunk-I5XITYNF.js";import{n as I}from"./chunk-BZABMW6L.js";import{Ab as c,Bc as y,Cb as f,Eb as a,Mb as g,Pb as x,Rb as m,Uc as C,Yb as v,Zb as h,_b as b,da as p,ec as $,ja as u,qb as s,va as d,wa as l}from"./chunk-NQDVBGGW.js";var L=(()=>{class t extends k{static \u0275fac=(()=>{let i;return function(e){return(i||(i=l(t)))(e||t)}})();static \u0275cmp=c({type:t,selectors:[["ChevronDownIcon"]],features:[a],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.097 3.61306 12.2748 3.62921C12.4527 3.64535 12.6199 3.72073 12.7498 3.84328C12.8797 3.96582 12.9647 4.12842 12.9912 4.30502C13.0177 4.48162 12.9841 4.662 12.8958 4.81724L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z","fill","currentColor"]],template:function(n,e){n&1&&(d(),v(0,"svg",0),b(1,"path",1),h()),n&2&&(m(e.getClassNames()),g("aria-label",e.ariaLabel)("aria-hidden",e.ariaHidden)("role",e.role))},encapsulation:2})}return t})();var B=({dt:t})=>`
.p-inputtext {
    font-family: inherit;
    font-feature-settings: inherit;
    font-size: 1rem;
    color: ${t("inputtext.color")};
    background: ${t("inputtext.background")};
    padding-block: ${t("inputtext.padding.y")};
    padding-inline: ${t("inputtext.padding.x")};
    border: 1px solid ${t("inputtext.border.color")};
    transition: background ${t("inputtext.transition.duration")}, color ${t("inputtext.transition.duration")}, border-color ${t("inputtext.transition.duration")}, outline-color ${t("inputtext.transition.duration")}, box-shadow ${t("inputtext.transition.duration")};
    appearance: none;
    border-radius: ${t("inputtext.border.radius")};
    outline-color: transparent;
    box-shadow: ${t("inputtext.shadow")};
}

.p-inputtext.ng-invalid.ng-dirty {
    border-color: ${t("inputtext.invalid.border.color")};
}

.p-inputtext:enabled:hover {
    border-color: ${t("inputtext.hover.border.color")};
}

.p-inputtext:enabled:focus {
    border-color: ${t("inputtext.focus.border.color")};
    box-shadow: ${t("inputtext.focus.ring.shadow")};
    outline: ${t("inputtext.focus.ring.width")} ${t("inputtext.focus.ring.style")} ${t("inputtext.focus.ring.color")};
    outline-offset: ${t("inputtext.focus.ring.offset")};
}

.p-inputtext.p-invalid {
    border-color: ${t("inputtext.invalid.border.color")};
}

.p-inputtext.p-variant-filled {
    background: ${t("inputtext.filled.background")};
}
    
.p-inputtext.p-variant-filled:enabled:hover {
    background: ${t("inputtext.filled.hover.background")};
}

.p-inputtext.p-variant-filled:enabled:focus {
    background: ${t("inputtext.filled.focus.background")};
}

.p-inputtext:disabled {
    opacity: 1;
    background: ${t("inputtext.disabled.background")};
    color: ${t("inputtext.disabled.color")};
}

.p-inputtext::placeholder {
    color: ${t("inputtext.placeholder.color")};
}

.p-inputtext.ng-invalid.ng-dirty::placeholder {
    color: ${t("inputtext.invalid.placeholder.color")};
}

.p-inputtext-sm {
    font-size: ${t("inputtext.sm.font.size")};
    padding-block: ${t("inputtext.sm.padding.y")};
    padding-inline: ${t("inputtext.sm.padding.x")};
}

.p-inputtext-lg {
    font-size: ${t("inputtext.lg.font.size")};
    padding-block: ${t("inputtext.lg.padding.y")};
    padding-inline: ${t("inputtext.lg.padding.x")};
}

.p-inputtext-fluid {
    width: 100%;
}
`,E={root:({instance:t,props:o})=>["p-inputtext p-component",{"p-filled":t.filled,"p-inputtext-sm":o.size==="small","p-inputtext-lg":o.size==="large","p-invalid":o.invalid,"p-variant-filled":o.variant==="filled","p-inputtext-fluid":o.fluid}]},D=(()=>{class t extends M{name="inputtext";theme=B;classes=E;static \u0275fac=(()=>{let i;return function(e){return(i||(i=l(t)))(e||t)}})();static \u0275prov=p({token:t,factory:t.\u0275fac})}return t})();var R=(()=>{class t extends F{ngModel;variant;fluid;pSize;filled;_componentStyle=u(D);get hasFluid(){let n=this.el.nativeElement.closest("p-fluid");return w(this.fluid)?!!n:this.fluid}constructor(i){super(),this.ngModel=i}ngAfterViewInit(){super.ngAfterViewInit(),this.updateFilledState(),this.cd.detectChanges()}ngDoCheck(){this.updateFilledState()}onInput(){this.updateFilledState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length||this.ngModel&&this.ngModel.model}static \u0275fac=function(n){return new(n||t)(s(I,8))};static \u0275dir=f({type:t,selectors:[["","pInputText",""]],hostAttrs:[1,"p-inputtext","p-component"],hostVars:14,hostBindings:function(n,e){if(n&1&&$("input",function(S){return e.onInput(S)}),n&2){let r;x("p-filled",e.filled)("p-variant-filled",((r=e.variant)!==null&&r!==void 0?r:e.config.inputStyle()||e.config.inputVariant())==="filled")("p-inputtext-fluid",e.hasFluid)("p-inputtext-sm",e.pSize==="small")("p-inputfield-sm",e.pSize==="small")("p-inputtext-lg",e.pSize==="large")("p-inputfield-lg",e.pSize==="large")}},inputs:{variant:"variant",fluid:[2,"fluid","fluid",C],pSize:"pSize"},features:[y([D]),a]})}return t})();export{L as a,R as b};
