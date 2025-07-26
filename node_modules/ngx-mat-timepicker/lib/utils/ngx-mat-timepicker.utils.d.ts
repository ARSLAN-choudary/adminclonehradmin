import { NgxMatTimepickerClockFace } from "../models/ngx-mat-timepicker-clock-face.interface";
import { NgxMatTimepickerDisabledConfig } from "../models/ngx-mat-timepicker-disabled-config.interface";
export declare class NgxMatTimepickerUtils {
    static get DEFAULT_MINUTES_GAP(): number;
    static disableHours(hours: NgxMatTimepickerClockFace[], config: NgxMatTimepickerDisabledConfig): NgxMatTimepickerClockFace[];
    static disableMinutes(minutes: NgxMatTimepickerClockFace[], selectedHour: number, config: NgxMatTimepickerDisabledConfig): NgxMatTimepickerClockFace[];
    static getHours(format: number): NgxMatTimepickerClockFace[];
    static getMinutes(gap?: number): NgxMatTimepickerClockFace[];
    static isDigit(e: KeyboardEvent): boolean;
}
