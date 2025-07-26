import * as i0 from "@angular/core";
export declare class NgxMatTimepickerLocaleService {
    get locale(): string;
    protected _initialLocale: string;
    protected _locale: string;
    constructor(initialLocale: string);
    updateLocale(newValue: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxMatTimepickerLocaleService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgxMatTimepickerLocaleService>;
}
