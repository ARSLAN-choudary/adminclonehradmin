import { NgxMatTimepickerToggleIconDirective } from "../../directives/ngx-mat-timepicker-toggle-icon.directive";
import { NgxMatTimepickerComponent } from "../ngx-mat-timepicker/ngx-mat-timepicker.component";
import * as i0 from "@angular/core";
export declare class NgxMatTimepickerToggleComponent {
    get disabled(): boolean;
    set disabled(value: boolean);
    customIcon: NgxMatTimepickerToggleIconDirective;
    timepicker: NgxMatTimepickerComponent;
    private _disabled;
    open(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxMatTimepickerToggleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxMatTimepickerToggleComponent, "ngx-mat-timepicker-toggle", never, { "disabled": { "alias": "disabled"; "required": false; }; "timepicker": { "alias": "for"; "required": false; }; }, {}, ["customIcon"], ["[ngxMatTimepickerToggleIcon]"], true, never>;
}
