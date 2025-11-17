import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONFIG } from '../../config'; // ✅ import config file

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

 verifyUser(payload: any): Observable<any> {
  return this.http.post(CONFIG.verifyregisterapi, payload).pipe(
    tap((res: any) => {
      const id = res?.data?.details?._id ?? '';
      if (id) localStorage.setItem('userId', id);
}
}
