import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CONFIG } from "../../config";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class BackendService {
  constructor(private http: HttpClient) {}

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

  updateUser(parms: any): Observable<any> {
    return this.http.post(CONFIG.updateUser, parms);
  }

  deleteUser(id: any): Observable<any> {
    const url = `${CONFIG.deleteUser}/${id}`;
    return this.http.delete(url);
  }

  addApplication(payload: any): Observable<any> {
    return this.http.post(CONFIG.addApplication, payload);
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
}
