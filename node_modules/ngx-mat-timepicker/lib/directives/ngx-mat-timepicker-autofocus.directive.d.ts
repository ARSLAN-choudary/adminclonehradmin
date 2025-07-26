import { ElementRef, OnChanges, OnDestroy } from "@angular/core";
import * as i0 from "@angular/core";
export declare class NgxMatTimepickerAutofocusDirective implements OnChanges, OnDestroy {
    private _element;
    private _document;
    isFocusActive: boolean;
    private _activeElement;
    constructor(_element: ElementRef, _document: any);
    ngOnChanges(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxMatTimepickerAutofocusDirective, [null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgxMatTimepickerAutofocusDirective, "[ngxMatTimepickerAutofocus]", never, { "isFocusActive": { "alias": "ngxMatTimepickerAutofocus"; "required": false; }; }, {}, never, never, true, never>;
}
