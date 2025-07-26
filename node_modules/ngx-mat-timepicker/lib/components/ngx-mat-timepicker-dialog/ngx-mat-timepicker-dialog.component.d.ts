import { MatDialogRef } from "@angular/material/dialog";
import { NgxMatTimepickerBaseDirective } from "../../directives/ngx-mat-timepicker-base.directive";
import { NgxMatTimepickerConfig } from "../../models/ngx-mat-timepicker-config.interface";
import { NgxMatTimepickerLocaleService } from "../../services/ngx-mat-timepicker-locale.service";
import { NgxMatTimepickerService } from "../../services/ngx-mat-timepicker.service";
import { NgxMatTimepickerEventService } from "../../services/ngx-mat-timepicker-event.service";
import * as i0 from "@angular/core";
export declare class NgxMatTimepickerDialogComponent extends NgxMatTimepickerBaseDirective {
    data: NgxMatTimepickerConfig;
    protected _dialogRef: MatDialogRef<NgxMatTimepickerDialogComponent>;
    constructor(data: NgxMatTimepickerConfig, _dialogRef: MatDialogRef<NgxMatTimepickerDialogComponent>, timepickerSrv: NgxMatTimepickerService, eventSrv: NgxMatTimepickerEventService, timepickerLocaleSrv: NgxMatTimepickerLocaleService);
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxMatTimepickerDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxMatTimepickerDialogComponent, "ngx-mat-timepicker-dialog", never, {}, {}, never, never, true, never>;
}
