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
  }

  // --- Move focus forward ---
  public ValueChanged(data: string, box: string): void {
    if (box === 'digit-1' && data) document.getElementById('digit-2')?.focus();
    else if (box === 'digit-2' && data) document.getElementById('digit-3')?.focus();
    else if (box === 'digit-3' && data) document.getElementById('digit-4')?.focus();
  }

  // --- Move focus backward ---
  public tiggerBackspace(data: string, box: string) {
    if (box === 'digit-4' && !data) document.getElementById('digit-3')?.focus();
    else if (box === 'digit-3' && !data) document.getElementById('digit-2')?.focus();
    else if (box === 'digit-2' && !data) document.getElementById('digit-1')?.focus();
  }

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
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.loading = false;
        console.error('❌ OTP verification failed:', err);
        this.errorMessage =
          err?.error?.message || 'OTP verification failed, please try again.';
      },
    });
  }
}
