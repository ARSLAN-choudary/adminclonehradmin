// auth.guard.ts
import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken(); // Replace with your logic

  if (!token) {
    router.navigate(["/app-register"]); // redirect to login
    return false;
  }

  return true;
};

export const loginRedirectGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.getToken()) {
    router.navigate(["/index"]); // redirect logged-in users to dashboard
    return false;
  }
  return true;
};
