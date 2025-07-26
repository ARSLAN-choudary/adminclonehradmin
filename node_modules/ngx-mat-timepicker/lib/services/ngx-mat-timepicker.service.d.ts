import { NgxMatTimepickerClockFace } from "../models/ngx-mat-timepicker-clock-face.interface";
import { NgxMatTimepickerPeriods } from "../models/ngx-mat-timepicker-periods.enum";
import { Observable } from "rxjs";
import { DateTime } from "ts-luxon";
import * as i0 from "@angular/core";
export declare class NgxMatTimepickerService {
    set hour(hour: NgxMatTimepickerClockFace);
    set minute(minute: NgxMatTimepickerClockFace);
    set period(period: NgxMatTimepickerPeriods);
    get selectedHour(): Observable<NgxMatTimepickerClockFace>;
    get selectedMinute(): Observable<NgxMatTimepickerClockFace>;
    get selectedPeriod(): Observable<NgxMatTimepickerPeriods>;
    private _hour$;
    private _minute$;
    private _period$;
    getFullTime(format: number): string;
    setDefaultTimeIfAvailable(time: string, min: DateTime, max: DateTime, format: number, minutesGap?: number): void;
    private _resetTime;
    private _setDefaultTime;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxMatTimepickerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgxMatTimepickerService>;
}
