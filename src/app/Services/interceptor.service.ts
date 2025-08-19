// interceptor.ts
import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { finalize, catchError, throwError } from "rxjs";
import { DataService } from "../shared/data/data.service";
import { Router } from "@angular/router";

export const interceptorFn: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const dataService = inject(DataService);
  const router = inject(Router);
  dataService.setLoaderState(true);
  // spinner.show();

  const isFormData = req.body instanceof FormData;
  const isLoginCall = req.url.includes("/login");
  const isUserDetailsCall = req.url.includes("/userDetails");
  const isForgetPasswordCall = req.url.includes("/forgot-password");

  if (!isLoginCall && !isUserDetailsCall && !isForgetPasswordCall) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
    });
  }

  return next(req).pipe(
    finalize(() => dataService.setLoaderState(false)),
    catchError((error) => {
      if (error.status === 401) {
        authService.clearToken();
        router.navigate(["/login"]);
      }
      return throwError(() => error);
    })
  );
};
