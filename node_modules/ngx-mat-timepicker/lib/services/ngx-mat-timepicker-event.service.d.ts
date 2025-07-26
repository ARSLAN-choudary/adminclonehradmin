import { Observable } from "rxjs";
import * as i0 from "@angular/core";
export declare class NgxMatTimepickerEventService {
    get backdropClick(): Observable<MouseEvent>;
    get keydownEvent(): Observable<KeyboardEvent>;
    private _backdropClick$;
    private _keydownEvent$;
    constructor();
    dispatchEvent(event: KeyboardEvent | MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxMatTimepickerEventService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgxMatTimepickerEventService>;
}
