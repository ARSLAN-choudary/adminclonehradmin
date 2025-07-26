import { NgxMatTimepickerFormatType } from "../models/ngx-mat-timepicker-format.type";
import { NgxMatTimepickerPeriods } from "../models/ngx-mat-timepicker-periods.enum";
import { NgxMatTimepickerOptions } from "../models/ngx-mat-timepicker-options.interface";
import { DateTime, NumberingSystem } from "ts-luxon";
export declare class NgxMatTimepickerAdapter {
    static defaultFormat: NgxMatTimepickerFormatType;
    static defaultLocale: string;
    static defaultNumberingSystem: NumberingSystem;
    /***
     *  Format hour according to time format (12 or 24)
     */
    static formatHour(currentHour: number, format: NgxMatTimepickerFormatType, period: NgxMatTimepickerPeriods): number;
    static formatTime(time: string, opts: NgxMatTimepickerOptions): string;
    static fromDateTimeToString(time: DateTime, format: NgxMatTimepickerFormatType): string;
    static isBetween(time: DateTime, before: DateTime, after: DateTime, unit?: "hours" | "minutes"): boolean;
    static isSameOrAfter(time: DateTime, compareWith: DateTime, unit?: "hours" | "minutes"): boolean;
    static isSameOrBefore(time: DateTime, compareWith: DateTime, unit?: "hours" | "minutes"): boolean;
    static isTimeAvailable(time: string, min?: DateTime, max?: DateTime, granularity?: "hours" | "minutes", minutesGap?: number | null, format?: number): boolean;
    static isTwentyFour(format: NgxMatTimepickerFormatType): boolean;
    static parseTime(time: string, opts: NgxMatTimepickerOptions): DateTime;
    static toLocaleTimeString(time: string, opts?: NgxMatTimepickerOptions): string;
    /**
     *
     * @param time
     * @param opts
     * @private
     */
    private static _getLocaleOptionsByTime;
}
