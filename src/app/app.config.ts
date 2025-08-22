import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import {
  provideClientHydration,
  withEventReplay,
} from "@angular/platform-browser";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { NgxMaskModule } from "ngx-mask";
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";
import { interceptorFn } from "./Services/interceptor.service";
import { ToastrModule } from "ngx-toastr";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    BsDatepickerModule.forRoot().providers!,
    provideAnimations(),
    provideHttpClient(),
    provideHttpClient(withInterceptors([interceptorFn])),
    importProvidersFrom(
      ToastrModule.forRoot({
        timeOut: 2000,
        positionClass: "toast-top-right",
        preventDuplicates: true,
      })
    ),
    provideAnimations(),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    NgxMaskModule.forRoot({
      showMaskTyped: false,
    }).providers!,
  ],
};
