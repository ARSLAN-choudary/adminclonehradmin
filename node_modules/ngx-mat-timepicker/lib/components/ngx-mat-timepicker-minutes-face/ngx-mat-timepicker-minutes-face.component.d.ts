import { EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { NgxMatTimepickerClockFace } from "../../models/ngx-mat-timepicker-clock-face.interface";
import { NgxMatTimepickerFormatType } from "../../models/ngx-mat-timepicker-format.type";
import { NgxMatTimepickerUnits } from "../../models/ngx-mat-timepicker-units.enum";
import { NgxMatTimepickerPeriods } from "../../models/ngx-mat-timepicker-periods.enum";
import { DateTime } from "ts-luxon";
import * as i0 from "@angular/core";
export declare class NgxMatTimepickerMinutesFaceComponent implements OnChanges {
    set color(newValue: ThemePalette);
    get color(): ThemePalette;
    dottedMinutesInGap: boolean;
    format: NgxMatTimepickerFormatType;
    maxTime: DateTime;
    minTime: DateTime;
    minuteChange: EventEmitter<NgxMatTimepickerClockFace>;
    minutesGap: number;
    minutesList: NgxMatTimepickerClockFace[];
    period: NgxMatTimepickerPeriods;
    selectedHour: number;
    selectedMinute: NgxMatTimepickerClockFace;
    timeUnit: typeof NgxMatTimepickerUnits;
    private _color;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxMatTimepickerMinutesFaceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxMatTimepickerMinutesFaceComponent, "ngx-mat-timepicker-minutes-face", never, { "color": { "alias": "color"; "required": false; }; "dottedMinutesInGap": { "alias": "dottedMinutesInGap"; "required": false; }; "format": { "alias": "format"; "required": false; }; "maxTime": { "alias": "maxTime"; "required": false; }; "minTime": { "alias": "minTime"; "required": false; }; "minutesGap": { "alias": "minutesGap"; "required": false; }; "period": { "alias": "period"; "required": false; }; "selectedHour": { "alias": "selectedHour"; "required": false; }; "selectedMinute": { "alias": "selectedMinute"; "required": false; }; }, { "minuteChange": "minuteChange"; }, never, never, true, never>;
}
