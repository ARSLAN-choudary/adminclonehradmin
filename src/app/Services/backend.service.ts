import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {CONFIG} from "../../config";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    constructor(private http: HttpClient) {
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

}
