import { EventEmitter, TemplateRef } from "@angular/core";
import { CdkOverlayOrigin, ConnectedPosition } from "@angular/cdk/overlay";
import { MatDialog } from "@angular/material/dialog";
import { ThemePalette } from "@angular/material/core";
import { NgxMatTimepickerFormatType } from "../../models/ngx-mat-timepicker-format.type";
import { NgxMatTimepickerDirective } from "../../directives/ngx-mat-timepicker.directive";
import { NgxMatTimepickerRef } from "../../models/ngx-mat-timepicker-ref.interface";
import { DateTime } from "ts-luxon";
import { BehaviorSubject } from "rxjs";
import * as i0 from "@angular/core";
export declare class NgxMatTimepickerProvider {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxMatTimepickerProvider, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxMatTimepickerProvider, "ngx-mat-timepicker-provider", never, {}, {}, never, never, true, never>;
}
export declare class NgxMatTimepickerComponent implements NgxMatTimepickerRef {
    private _dialog;
    static nextId: number;
    set appendToInput(newValue: boolean | string | void);
    set color(newValue: ThemePalette);
    get color(): ThemePalette;
    get disabled(): boolean;
    set dottedMinutesInGap(newValue: boolean | "");
    get dottedMinutesInGap(): boolean;
    set enableKeyboardInput(newValue: boolean | string | void);
    get enableKeyboardInput(): boolean;
    get format(): NgxMatTimepickerFormatType;
    set format(value: NgxMatTimepickerFormatType);
    get inputElement(): HTMLElement;
    get maxTime(): DateTime;
    get minTime(): DateTime;
    get minutesGap(): number;
    set minutesGap(gap: number);
    get overlayOrigin(): CdkOverlayOrigin;
    get time(): string;
    cancelBtnTmpl: TemplateRef<Node>;
    closed: EventEmitter<void>;
    confirmBtnTmpl: TemplateRef<Node>;
    defaultTime: string;
    disableAnimation: boolean;
    editableHintTmpl: TemplateRef<Node>;
    hourSelected: EventEmitter<number>;
    hoursOnly: boolean;
    id: string;
    isEsc: boolean;
    max: DateTime;
    min: DateTime;
    opened: EventEmitter<void>;
    overlayPositions: ConnectedPosition[];
    preventOverlayClick: boolean;
    showPicker: boolean;
    timeChanged: EventEmitter<string>;
    timepickerClass: string;
    timeSet: EventEmitter<string>;
    timeUpdated: BehaviorSubject<string>;
    private _appendToInput;
    private _color;
    private _dialogRef;
    private _dottedMinutesInGap;
    private _enableKeyboardInput;
    private _format;
    private _minutesGap;
    private _overlayRef;
    private _timepickerInput;
    constructor(_dialog: MatDialog);
    close(): void;
    open(): void;
    /***
     * Register an input with this timepicker.
     * input - The timepicker input to register with this timepicker
     */
    registerInput(input: NgxMatTimepickerDirective): void;
    unregisterInput(): void;
    updateTime(time: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxMatTimepickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxMatTimepickerComponent, "ngx-mat-timepicker", never, { "appendToInput": { "alias": "appendToInput"; "required": false; }; "color": { "alias": "color"; "required": false; }; "dottedMinutesInGap": { "alias": "dottedMinutesInGap"; "required": false; }; "enableKeyboardInput": { "alias": "enableKeyboardInput"; "required": false; }; "format": { "alias": "format"; "required": false; }; "minutesGap": { "alias": "minutesGap"; "required": false; }; "cancelBtnTmpl": { "alias": "cancelBtnTmpl"; "required": false; }; "confirmBtnTmpl": { "alias": "confirmBtnTmpl"; "required": false; }; "defaultTime": { "alias": "defaultTime"; "required": false; }; "disableAnimation": { "alias": "disableAnimation"; "required": false; }; "editableHintTmpl": { "alias": "editableHintTmpl"; "required": false; }; "hoursOnly": { "alias": "hoursOnly"; "required": false; }; "isEsc": { "alias": "isEsc"; "required": false; }; "max": { "alias": "max"; "required": false; }; "min": { "alias": "min"; "required": false; }; "preventOverlayClick": { "alias": "preventOverlayClick"; "required": false; }; "timepickerClass": { "alias": "timepickerClass"; "required": false; }; }, { "closed": "closed"; "hourSelected": "hourSelected"; "opened": "opened"; "timeChanged": "timeChanged"; "timeSet": "timeSet"; }, never, never, true, never>;
}
