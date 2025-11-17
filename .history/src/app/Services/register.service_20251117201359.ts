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
      const detail = res?.details?._id ?? '';
      if (id) localStorage.setItem('userId', id);
      if (res?.status !== undefined) localStorage.setItem('status', JSON.stringify(res.status));
      if (res?.rule !== undefined) localStorage.setItem('rule', JSON.stringify(res.rule));
    })
  );
}
}
