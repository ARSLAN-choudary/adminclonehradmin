import { OnChanges, SimpleChanges } from "@angular/core";
import { NgxMatTimepickerHoursFaceDirective } from "../ngx-mat-timepicker-hours-face/ngx-mat-timepicker-hours-face.directive";
import { NgxMatTimepickerPeriods } from "../../models/ngx-mat-timepicker-periods.enum";
import * as i0 from "@angular/core";
export declare class NgxMatTimepicker12HoursFaceComponent extends NgxMatTimepickerHoursFaceDirective implements OnChanges {
    period: NgxMatTimepickerPeriods;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxMatTimepicker12HoursFaceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxMatTimepicker12HoursFaceComponent, "ngx-mat-timepicker-12-hours-face", never, { "period": { "alias": "period"; "required": false; }; }, {}, never, never, true, never>;
}
