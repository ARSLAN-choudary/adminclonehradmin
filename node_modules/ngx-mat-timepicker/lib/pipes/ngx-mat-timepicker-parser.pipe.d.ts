import { PipeTransform } from "@angular/core";
import { NgxMatTimepickerUnits } from "../models/ngx-mat-timepicker-units.enum";
import { NgxMatTimepickerLocaleService } from "../services/ngx-mat-timepicker-locale.service";
import * as i0 from "@angular/core";
export declare class NgxMatTimepickerParserPipe implements PipeTransform {
    private _timepickerLocaleSrv;
    private get _locale();
    private readonly _numberingSystem;
    constructor(_timepickerLocaleSrv: NgxMatTimepickerLocaleService);
    transform(time: string | number, timeUnit?: NgxMatTimepickerUnits): string;
    private _parseTime;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxMatTimepickerParserPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<NgxMatTimepickerParserPipe, "ngxMatTimepickerParser", true>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgxMatTimepickerParserPipe>;
}
