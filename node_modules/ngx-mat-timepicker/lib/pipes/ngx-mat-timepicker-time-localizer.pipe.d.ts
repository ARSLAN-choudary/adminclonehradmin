import { PipeTransform } from "@angular/core";
import { NgxMatTimepickerLocaleService } from "../services/ngx-mat-timepicker-locale.service";
import { NgxMatTimepickerUnits } from "../models/ngx-mat-timepicker-units.enum";
import * as i0 from "@angular/core";
export declare class NgxMatTimepickerTimeLocalizerPipe implements PipeTransform {
    private _timepickerLocaleSrv;
    private get _locale();
    constructor(_timepickerLocaleSrv: NgxMatTimepickerLocaleService);
    transform(time: number | string, timeUnit: NgxMatTimepickerUnits, isKeyboardEnabled?: boolean): string;
    private _formatTime;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxMatTimepickerTimeLocalizerPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<NgxMatTimepickerTimeLocalizerPipe, "timeLocalizer", true>;
}
