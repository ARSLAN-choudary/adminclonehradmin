import { Injectable, signal, WritableSignal } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class ToggleService {
  private otpData$ = new BehaviorSubject<string>('');

  constructor() {}

  getOtpData(): Observable<string> {
    return this.otpData$.asObservable();
  }

  setOtpData(email: string) {
    this.otpData$.next(email);
  }
}
