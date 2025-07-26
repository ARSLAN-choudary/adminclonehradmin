import { PipeTransform } from "@angular/core";
import { NgxMatTimepickerUnits } from "../models/ngx-mat-timepicker-units.enum";
import * as i0 from "@angular/core";
export declare class NgxMatTimepickerTimeFormatterPipe implements PipeTransform {
    transform(time: number | string, timeUnit: NgxMatTimepickerUnits): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxMatTimepickerTimeFormatterPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<NgxMatTimepickerTimeFormatterPipe, "timeFormatter", true>;
}
