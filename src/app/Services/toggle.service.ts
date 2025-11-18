import { Injectable, signal, WritableSignal } from "@angular/core";
import { BehaviorSubject } from "rxjs";
export interface OtpData {
  email: string;
  otp: string;
}
@Injectable({
  providedIn: "root",
})
export class ToggleService {
  private otpData: BehaviorSubject<OtpData | null> = new BehaviorSubject<OtpData | null>(null);

  constructor() {}

  getOtpData() {
    return this.otpData;
  }
  setOtpData(data: any) {
    this.otpData.next(data);
  }
}
