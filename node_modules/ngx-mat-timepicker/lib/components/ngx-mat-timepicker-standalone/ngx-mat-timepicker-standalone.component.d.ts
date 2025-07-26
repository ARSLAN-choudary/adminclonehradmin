import { NgxMatTimepickerLocaleService } from "../../services/ngx-mat-timepicker-locale.service";
import { NgxMatTimepickerService } from "../../services/ngx-mat-timepicker.service";
import { NgxMatTimepickerEventService } from "../../services/ngx-mat-timepicker-event.service";
import { NgxMatTimepickerConfig } from "../../models/ngx-mat-timepicker-config.interface";
import { NgxMatTimepickerBaseDirective } from "../../directives/ngx-mat-timepicker-base.directive";
import * as i0 from "@angular/core";
export declare class NgxMatTimepickerStandaloneComponent extends NgxMatTimepickerBaseDirective {
    data: NgxMatTimepickerConfig;
    constructor(data: NgxMatTimepickerConfig, timepickerSrv: NgxMatTimepickerService, eventSrv: NgxMatTimepickerEventService, timepickerLocaleSrv: NgxMatTimepickerLocaleService);
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxMatTimepickerStandaloneComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxMatTimepickerStandaloneComponent, "ngx-mat-timepicker-standalone", never, {}, {}, never, never, true, never>;
}
