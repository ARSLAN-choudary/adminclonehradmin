import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { routes } from '../../shared/routes/routes';

@Component({
  selector: 'app-two-step-verification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './two-step-verification.component.html',
  styleUrls: ['./two-step-verification.component.scss'],
})
export class TwoStepVerificationComponent implements OnInit, OnDestroy {
  public routes = routes;
  public currentYear = new Date().getFullYear();
  public email: string = '';
  public loading = false;
  public errorMessage = '';

  // OTP input fields
  public oneTimePassword = {
    data1: '',
    data2: '',
    data3: '',
    data4: '',
  };

  // Countdown timer variables
  public countdownDisplay: string = '10:00';
  private countdownInterval: any;
  private totalSeconds: number = 600; // 10 minutes in seconds

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || '';
      console.log('📩 Received email from previous step:', this.email);
    });

    // Start the countdown timer
    this.startCountdown();
  }

  ngOnDestroy() {
    // Clear the interval when component is destroyed
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  // Start the 10-minute countdown timer
  private startCountdown(): void {
    this.totalSeconds = 600; // Reset to 10 minutes
    this.updateCountdownDisplay();

    this.countdownInterval = setInterval(() => {
      this.totalSeconds--;
      this.updateCountdownDisplay();

      if (this.totalSeconds <= 0) {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  // Update the countdown display in MM:SS format
  private updateCountdownDisplay(): void {
    const minutes = Math.floor(this.totalSeconds / 60);
    const seconds = this.totalSeconds % 60;
    this.countdownDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // --- Move focus forward ---
  public ValueChanged(data: string, box: string): void {
    if (box === 'digit-1' && data) document.getElementById('digit-2')?.focus();
    else if (box === 'digit-2' && data) document.getElementById('digit-3')?.focus();
    else if (box === 'digit-3' && data) document.getElementById('digit-4')?.focus();
  }

  // --- Move focus backward ---
  // public tiggerBackspace(data: string, box: string) {
  //   if (box === 'digit-4' && !data) document.getElementById('digit-3')?.focus();
  //   else if (box === 'digit-3' && !data) document.getElementById('digit-2')?.focus();
  //   else if (box === 'digit-2' && !data) document.getElementById('digit-1')?.focus();
  // }

  // --- Get full OTP string ---
  private getFullOtp(): string {
    return (
      this.oneTimePassword.data1 +
      this.oneTimePassword.data2 +
      this.oneTimePassword.data3 +
      this.oneTimePassword.data4
    );
  }

  // --- Verify OTP (email + otp only) ---
  verifyOtp() {
    const otp = this.getFullOtp();

    if (otp.length !== 4) {
      this.errorMessage = 'Please enter a valid 4-digit OTP';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    console.log('📤 Sending OTP verification request:', { email: this.email, otp });

    this.authService.verifyOtp(this.email, otp).subscribe({
      next: (res: any) => {
        console.log('✅ OTP Verified Successfully:', res);
        this.loading = false;
        // ✅ Redirect to login or dashboard after successful verification
        this.router.navigate(['/index']);
      },
      error: (err: any) => {
        this.loading = false;
        console.error('❌ OTP verification failed:', err);
        this.errorMessage =
          err?.error?.message || 'OTP verification failed, please try again.';
      },
    });
  }

  public tiggerBackspace(data: string, box: string) {
  // Prevent default behavior for iOS Safari
  event?.preventDefault();

  switch (box) {
    case 'digit-4':
      this.oneTimePassword.data4 = '';
      if (!data) {
        const prev = document.getElementById('digit-3') as HTMLInputElement;
        prev?.focus();
        prev?.select(); // iOS me cursor select karna zaruri hai
      }
      break;

    case 'digit-3':
      this.oneTimePassword.data3 = '';
      if (!data) {
        const prev = document.getElementById('digit-2') as HTMLInputElement;
        prev?.focus();
        prev?.select();
      }
      break;

    case 'digit-2':
      this.oneTimePassword.data2 = '';
      if (!data) {
        const prev = document.getElementById('digit-1') as HTMLInputElement;
        prev?.focus();
        prev?.select();
      }
      break;

    case 'digit-1':
      this.oneTimePassword.data1 = '';
      break;
  }
}
 
otpSucces(userData: any) {
  const redirectUrl = '/login';
  const flutterUrl = `blacklane://registered?redirect=${encodeURIComponent(redirectUrl)}`;

  window.location.href = flutterUrl;
}


}