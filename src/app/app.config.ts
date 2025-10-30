import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { NgxMaskModule } from "ngx-mask";
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";
import { interceptorFn } from "./Services/interceptor.service";
import { ToastrModule } from "ngx-toastr";

// ✅ Firebase imports
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { provideAuth, getAuth } from "@angular/fire/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2bsgR5TJ2oy3pnuXSWgOJx2CnzTQsN18",
  authDomain: "blacklane-bdbf4.firebaseapp.com",
  projectId: "blacklane-bdbf4",
  storageBucket: "blacklane-bdbf4.firebasestorage.app",
  messagingSenderId: "636602181517",
  appId: "1:636602181517:web:23df830edc2a258bed3fc4",
  measurementId: "G-0QSVE900ZY"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    BsDatepickerModule.forRoot().providers!,
    provideAnimations(),
    provideHttpClient(withInterceptors([interceptorFn])),
    // ✅ Firebase providers (direct)
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),

    importProvidersFrom(
      ToastrModule.forRoot({
        timeOut: 2000,
        positionClass: "toast-top-right",
        preventDuplicates: true,
      }),
      NgxMaskModule.forRoot({
        showMaskTyped: false,
      })
    ),

    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
};
