import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {NgxMaskModule} from 'ngx-mask';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {interceptorFn} from "./Services/interceptor.service";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        BsDatepickerModule.forRoot().providers!,
        provideAnimations(),
        provideHttpClient(),
        provideHttpClient(withInterceptors([interceptorFn])),

        {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
        JwtHelperService,
        NgxMaskModule.forRoot({
            showMaskTyped: false,
        }).providers!,
    ],

};
