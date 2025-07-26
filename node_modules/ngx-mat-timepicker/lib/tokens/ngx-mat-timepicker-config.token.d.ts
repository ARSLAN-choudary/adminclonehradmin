import { InjectionToken, Provider } from "@angular/core";
import { NgxMatTimepickerConfig } from "../models/ngx-mat-timepicker-config.interface";
export declare const NGX_MAT_TIMEPICKER_CONFIG: InjectionToken<NgxMatTimepickerConfig>;
export declare function provideNgxMatTimepickerOptions(config: NgxMatTimepickerConfig): Provider[];
