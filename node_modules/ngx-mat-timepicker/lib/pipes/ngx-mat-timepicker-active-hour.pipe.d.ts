import { PipeTransform } from "@angular/core";
import * as i0 from "@angular/core";
export declare class NgxMatTimepickerActiveHourPipe implements PipeTransform {
    transform(hour: number, currentHour: number, isClockFaceDisabled: boolean): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxMatTimepickerActiveHourPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<NgxMatTimepickerActiveHourPipe, "activeHour", true>;
}
