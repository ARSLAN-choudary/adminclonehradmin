import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { Router } from "@angular/router";
import { CONFIG } from "../../../config";
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

  // --- ✅ STEP 1: Send OTP for registration (email + location + position) ---
  verifyUserRegister(payload: any): Observable<any> {
    // ✅ API: /api/auth/register
    return this.http.post(CONFIG.verifyregisterapi, payload);
  }

  // --- ✅ STEP 2: Verify OTP (email + otp only) ---
  verifyOtp(email: string, otp: string): Observable<any> {
    const body = { email, otp }; // only send email + otp
    // ✅ API: /api/auth/uservarify
    return this.http.post(CONFIG.registerapi, body);
  }

  // --- (Optional) Register API if needed later ---
  registerapi(payload: any): Observable<any> {
    return this.http.post(CONFIG.registerapi, payload);
  }
}
