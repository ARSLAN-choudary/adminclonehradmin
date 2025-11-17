import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CONFIG } from '../../config'; // ✅ import config file

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

 verifyUser(payload: any): Observable<any> {
  return this.http.post(CONFIG.verifyregisterapi, payload).pipe(
    tap((res: any) => {
      const detail = res?.details ?? '';
      if (detail) localStorage.setItem('userId', detail._id);
      if (detail) localStorage.setItem('status', JSON.stringify(res.status));
      if (detail) localStorage.setItem('rule', JSON.stringify(res.rule));
    })
  );
}
}
