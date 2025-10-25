import { Component } from '@angular/core';
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
export class TwoStepVerificationComponent {
  public routes = routes;
  public currentYear = new Date().getFullYear();
  public email: string = ''; // from query param
  public loading = false;
  public errorMessage = '';

  // OTP and Password fields
  public oneTimePassword = {
    data1: '',
    data2: '',
    data3: '',
    data4: '',
  };

  public password: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // ✅ Get email from query params (sent from register step)
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || '';
      console.log('📩 Received email from previous step:', this.email);
    });
  }

  // --- Input auto-navigation ---
  public ValueChanged(data: string, box: string): void {
    if (box === 'digit-1' && data.length > 0) {
      document.getElementById('digit-2')?.focus();
    } else if (box === 'digit-2' && data.length > 0) {
      document.getElementById('digit-3')?.focus();
    } else if (box === 'digit-3' && data.length > 0) {
      document.getElementById('digit-4')?.focus();
    }
  }

  public tiggerBackspace(data: string, box: string) {
    const val = data ? data.toString() : null;
    if (box === 'digit-4' && !val) {
      document.getElementById('digit-3')?.focus();
    } else if (box === 'digit-3' && !val) {
      document.getElementById('digit-2')?.focus();
    } else if (box === 'digit-2' && !val) {
      document.getElementById('digit-1')?.focus();
    }
  }

  // --- Combine OTP digits ---
  private getFullOtp(): string {
    return (
      this.oneTimePassword.data1 +
      this.oneTimePassword.data2 +
      this.oneTimePassword.data3 +
      this.oneTimePassword.data4
    );
  }

  // --- Submit OTP + Password ---
  navigation() {
    const otp = this.getFullOtp();

    if (otp.length < 4 || this.password.length < 6) {
      this.errorMessage = 'Enter valid 4-digit OTP and minimum 6-char password';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const payload = {
      email: this.email,
      otp: otp,
      password: this.password,
    };

    console.log('📤 Sending OTP + Password payload:', payload);

    this.authService.verifyUser(payload).subscribe({
      next: (res: any) => {
        console.log('✅ OTP Verified & Password Set:', res);
        this.loading = false;

        // Navigate to dashboard or reset-password success page
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.loading = false;
        console.error('❌ Verification failed:', err);
        this.errorMessage =
          err?.error?.message || 'OTP verification or password setup failed';
      },
    });
  }
}
