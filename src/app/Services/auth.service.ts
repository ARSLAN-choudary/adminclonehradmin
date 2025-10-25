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
  login(email: string, password: string): Observable<any> {
    return this.http.post(CONFIG.login, { email, password }).pipe(
      tap((response: any) => {
        // const token = response.data.accessToken;
        // localStorage.setItem("token", token);
        localStorage.setItem("role", response.data.details.role);
        // localStorage.setItem("id", response.data.userDetail._id);
      })
    );
  }
private apiUrl = 'https://my-planent-admin.fly.dev/api/auth/uservarify';
  logout(): void {
    localStorage.removeItem("token");
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  isLoggedIn(): any {
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }
  clearToken() {
    localStorage.removeItem("token");
  }

   verifyUser(payload: any): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }


   verifyUserRegister(payload: any): Observable<any> {
  return this.http.post(CONFIG.verifyregisterapi, payload);
}
   registerapi(payload: any): Observable<any> {
  return this.http.post(CONFIG.registerapi, payload);
}
   
}
