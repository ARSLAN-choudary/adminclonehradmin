import { EventEmitter } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { NgxMatTimepickerClockFace } from "../../models/ngx-mat-timepicker-clock-face.interface";
import { NgxMatTimepickerFormatType } from "../../models/ngx-mat-timepicker-format.type";
import { DateTime } from "ts-luxon";
import * as i0 from "@angular/core";
export declare class NgxMatTimepickerHoursFaceDirective {
    set color(newValue: ThemePalette);
    get color(): ThemePalette;
    set format(newValue: NgxMatTimepickerFormatType);
    get format(): NgxMatTimepickerFormatType;
    hourChange: EventEmitter<NgxMatTimepickerClockFace>;
    hourSelected: EventEmitter<number>;
    hoursList: NgxMatTimepickerClockFace[];
    maxTime: DateTime;
    minTime: DateTime;
    selectedHour: NgxMatTimepickerClockFace;
    protected _color: ThemePalette;
    protected _format: NgxMatTimepickerFormatType;
    constructor();
    onTimeSelected(time: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxMatTimepickerHoursFaceDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgxMatTimepickerHoursFaceDirective, "[ngxMatTimepickerHoursFace]", never, { "color": { "alias": "color"; "required": false; }; "format": { "alias": "format"; "required": false; }; "maxTime": { "alias": "maxTime"; "required": false; }; "minTime": { "alias": "minTime"; "required": false; }; "selectedHour": { "alias": "selectedHour"; "required": false; }; }, { "hourChange": "hourChange"; "hourSelected": "hourSelected"; }, never, never, true, never>;
}
