import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { CONFIG } from "../../config";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class BackendService {
  constructor(private http: HttpClient) {}

  getBoltTokenFromServer(clientId: string, clientSecret: string) {
    const body = new URLSearchParams();
    body.set("client_id", clientId);
    body.set("client_secret", clientSecret);
    body.set("grant_type", "client_credentials");
    body.set("scope", "fleet-integration:api");

    return this.http.post<{
      access_token: string;
      expires_in: number;
      token_type: "Bearer";
      scope: string;
    }>(CONFIG.boltTokenFromServer, body.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Skip-Auth": "true",
      },
    });
  }

  getBoltCompanies(params?: Record<string, string | number | boolean>) {
    const token = localStorage.getItem("bolt_access_token");
    if (!token) {
      return throwError(
        () => new Error("No bolt_access_token in localStorage")
      );
    }

    let httpParams = new HttpParams();
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        httpParams = httpParams.set(k, String(v));
      }
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(CONFIG.getBoltCompanies, {
      headers,
      params: httpParams,
    });
  }

  getBoltFleetOrder(params: any): Observable<any> {
    const token = localStorage.getItem("bolt_access_token");
    if (!token) {
      return throwError(
        () => new Error("No bolt_access_token in localStorage")
      );
    }

    let httpParams = new HttpParams();
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        httpParams = httpParams.set(k, String(v));
      }
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(CONFIG.getBoltFleetOrder, params, { headers });
  }

  getBoltDrivers(params: any): Observable<any> {
    const token = localStorage.getItem("bolt_access_token");
    if (!token) {
      return throwError(
        () => new Error("No bolt_access_token in localStorage")
      );
    }

    let httpParams = new HttpParams();
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        httpParams = httpParams.set(k, String(v));
      }
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(CONFIG.getBoltDrivers, params, { headers });
  }

  getBoltVehicles(parms: any) {
    const token = localStorage.getItem("bolt_access_token");
    if (!token) {
      return throwError(
        () => new Error("No bolt_access_token in localStorage")
      );
    }

    let httpParams = new HttpParams();
    if (parms) {
      for (const [k, v] of Object.entries(parms)) {
        httpParams = httpParams.set(k, String(v));
      }
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(CONFIG.GetBoltVehicle, parms, { headers });
  }

  getBoltFleetStateLogs(parms: any) {
    const token = localStorage.getItem("bolt_access_token");
    if (!token) {
      return throwError(
        () => new Error("No bolt_access_token in localStorage")
      );
    }

    let httpParams = new HttpParams();
    if (parms) {
      for (const [k, v] of Object.entries(parms)) {
        httpParams = httpParams.set(k, String(v));
      }
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(CONFIG.getBoltFleetStateLogs, parms, {
      headers,
    });
  }

  addCompany(parms: any): Observable<any> {
    return this.http.post(CONFIG.addCompany, parms);
  }

  getCompany(parms: any): Observable<any> {
    return this.http.post(CONFIG.getCompany, parms);
  }

  getManageUsers(parms: any): Observable<any> {
    return this.http.post(CONFIG.getManageUsers, parms);
  }

  addUser(parms: any): Observable<any> {
    return this.http.post(CONFIG.addUser, parms);
  }

  updateUser(payload: any): Observable<any> {
    return this.http.put(CONFIG.updateUser, payload);
  }

  updateApplication(payload: any): Observable<any> {
    return this.http.put(CONFIG.updateApplication, payload);
  }

  updateCompany(payload: any): Observable<any> {
    return this.http.put(CONFIG.updateCompany, payload);
  }
  uploadContract(payload: any): Observable<any> {
    return this.http.post(CONFIG.uploadContract, payload);
  }
  getUploadContract(id: any): Observable<any> {
    const url = `${CONFIG.getUploadContract}/${id}`;
    return this.http.post(CONFIG.url, {});
  }

  deleteUser(id: any): Observable<any> {
    const url = `${CONFIG.deleteUser}/${id}`;
    return this.http.delete(url);
  }

  deleteCompany(id: any): Observable<any> {
    const url = `${CONFIG.deleteCompany}/${id}`;
    return this.http.delete(url);
  }

  deleteApplication(id: any): Observable<any> {
    const url = `${CONFIG.deleteApplication}/${id}`;
    return this.http.delete(url);
  }

  addApplication(payload: any): Observable<any> {
    return this.http.post(CONFIG.addApplication, payload);
  }

  applicationResend(payload: any): Observable<any> {
    return this.http.post(CONFIG.applicationResend, payload);
  }

  getApplications(payload: any): Observable<any> {
    return this.http.post(CONFIG.getApplications, payload);
  }

  addUserDetails(payload: any): Observable<any> {
    return this.http.put(CONFIG.addUserDetail, payload);
  }

  uploadPdfFiles(payload: any): Observable<any> {
    return this.http.post(CONFIG.uploadPdfFiles, payload);
  }

  getApplicationDetails(id: any): Observable<any> {
    const url = `${CONFIG.getApplicationDetails}/${id}`;
    return this.http.get(url);
  }

  sentOtp(payload: any): Observable<any> {
    return this.http.post(CONFIG.forgetPassword, payload);
  }

  verifyOtp(payload: any): Observable<any> {
    return this.http.post(CONFIG.verifyOtp, payload);
  }

 updateDocStatus(payload: any) {
  return this.http.post(CONFIG.updateDocStatus, payload); 
  }
 uploadDocuments(payload: any) {
  return this.http.post(CONFIG.uploadDocuments, payload); 
  }
 userDetail(userId: any) {
   return this.http.post(`${CONFIG.userDetail}/${userId}`, {}); 
  }

  getApplicationById(id: string) {
  return this.http.get(`${CONFIG.applicationDetail}/${id}`);
}


}
