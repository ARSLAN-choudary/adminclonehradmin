import { Injectable, signal, WritableSignal } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
interface OtpData {
  email: string | null;
}

@Injectable({
  providedIn: "root",
})
export class ToggleService {
  private otpData$ = new BehaviorSubject<OtpData>({ email: null });

  constructor() {}

  getOtpData(): Observable<OtpData> {
    return this.otpData$.asObservable();
  }

  setOtpData(email: string) {
    this.otpData$.next({ email });
  }
}
