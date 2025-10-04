// interceptor.ts
import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { finalize, catchError, throwError } from "rxjs";
import { DataService } from "../shared/data/data.service";
import { Router } from "@angular/router";

export const interceptorFn: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const dataService = inject(DataService);
  const router = inject(Router);

  dataService.setLoaderState(true);

  const token = authService.getToken();
  const isFormData = req.body instanceof FormData;

  // Allow callers to opt-out OR auto-skip for Bolt token URL
  const callerWantsSkip = req.headers.has("X-Skip-Auth");
  const isBoltTokenUrl =
    req.url.includes("oidc.bolt.eu/token") || req.url.includes("/bolt/token");

  const isLoginCall = req.url.includes("/login");
  const isUserDetailsCall = req.url.includes("/userDetails");
  const isForgetPasswordCall = req.url.includes("/forgot-password");
  const isBoltDomain = req.url.startsWith('https://node.bolt.eu/');

  const skipAuth =
    callerWantsSkip ||
    isBoltTokenUrl ||
    isLoginCall ||
    isUserDetailsCall ||
    isForgetPasswordCall;

  if (callerWantsSkip) {
    req = req.clone({ headers: req.headers.delete("X-Skip-Auth") });
  }

  if (isBoltDomain) {
    // Don’t add Authorization or force Content-Type
    return next(req);
  }
  if (!skipAuth) {
    const setHeaders: Record<string, string> = {};

    // Only add bearer if we actually have one
    if (token) setHeaders["Authorization"] = `Bearer ${token}`;

    // Only set JSON if caller didn't specify and it's not FormData
    if (!isFormData && !req.headers.has("Content-Type")) {
      setHeaders["Content-Type"] = "application/json";
    }

    req = req.clone({ setHeaders });
  }

  return next(req).pipe(
    finalize(() => dataService.setLoaderState(false)),
    catchError((error) => {
      if (error.status === 401 && !skipAuth) {
        // only bounce to login for protected app calls
        authService.clearToken();
        router.navigate(["/login"]);
      }
      return throwError(() => error);
    })
  );
};
