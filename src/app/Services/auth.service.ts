import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { Router } from "@angular/router";
import { CONFIG } from "../../config";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  // --- LOGIN ---
  login(email: string, password: string): Observable<any> {
    return this.http.post(CONFIG.login, { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem("role", response.data.details.role);
        // localStorage.setItem("token", response.data.accessToken); // if available
      })
    );
  }

  // --- LOGOUT ---
  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  // --- TOKEN HELPERS ---
  getToken(): string | null {
    return localStorage.getItem("token");
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  clearToken(): void {
    localStorage.removeItem("token");
  }

  // --- ✅ OTP Verification (Email + OTP Only, No Password) ---
  verifyOtp(email: string, otp: string): Observable<any> {
    const body = { email, otp }; // Only send email + otp
    return this.http.post(CONFIG.verifyregisterapi, body);
    // verifyregisterapi = BASE_URL_API + "/api/auth/register"
  }

  // --- Register API ---
  registerapi(payload: any): Observable<any> {
    return this.http.post(CONFIG.registerapi, payload);
    // registerapi = BASE_URL_API + "/api/auth/uservarify"
  }
}
