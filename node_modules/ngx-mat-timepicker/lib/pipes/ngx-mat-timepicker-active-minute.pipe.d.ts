import { PipeTransform } from "@angular/core";
import * as i0 from "@angular/core";
export declare class NgxMatTimepickerActiveMinutePipe implements PipeTransform {
    transform(minute: number, currentMinute: number, gap: number | void, isClockFaceDisabled: boolean): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxMatTimepickerActiveMinutePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<NgxMatTimepickerActiveMinutePipe, "activeMinute", true>;
}
