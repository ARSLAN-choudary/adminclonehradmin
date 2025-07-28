// interceptor.ts
import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { finalize, catchError, throwError } from "rxjs";
import { DataService } from "../shared/data/data.service";

export const interceptorFn: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const dataService = inject(DataService);

  dataService.setLoaderState(true);
  // spinner.show();

  const isFormData = req.body instanceof FormData;

  if (!req.url.includes("/login")) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
    });
  }

  return next(req).pipe(
    finalize(() => dataService.setLoaderState(false)),
    catchError((error) => throwError(() => error))
  );
};
