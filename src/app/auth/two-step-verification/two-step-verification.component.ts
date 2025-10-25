import {
  Component,
  computed,
  signal,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
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

  // reference to all OTP inputs
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.startCountdown();
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || '';
      console.log('📩 Received email from previous step:', this.email);
    });
  }

  // --- Handle value change (auto move next) ---
  public ValueChanged(index: number, event: any): void {
    const value = event.target.value;
    const inputs = this.otpInputs.toArray();

    // Move forward only if user typed a value
    if (value && index < inputs.length - 1) {
      setTimeout(() => inputs[index + 1].nativeElement.focus(), 10);
    }
  }

  // --- Handle Backspace (move prev + clear) ---
  public tiggerBackspace(index: number, event: KeyboardEvent): void {
    const inputs = this.otpInputs.toArray();
    const input = inputs[index].nativeElement;

    if (event.key === 'Backspace') {
      if (input.value === '' && index > 0) {
        setTimeout(() => inputs[index - 1].nativeElement.focus(), 10);
      } else {
        // iOS Safari fix — manually clear the value
        input.value = '';
      }
    }
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

    console.log('📤 Sending OTP verification request:', {
      email: this.email,
      otp,
    });

    this.authService.verifyOtp(this.email, otp).subscribe({
      next: (res: any) => {
        console.log('✅ OTP Verified Successfully:', res);
        this.loading = false;
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

  // --- Countdown Timer ---
  private intervalId: any;
  totalTime = 10 * 60; // 10 minutes
  remainingTime = signal<number>(this.totalTime);
  formattedTime = computed(() => {
    const minutes = Math.floor(this.remainingTime() / 60);
    const seconds = this.remainingTime() % 60;
    return `${minutes.toString().padStart(2, '0')} : ${seconds
      .toString()
      .padStart(2, '0')}`;
  });

  startCountdown() {
    this.intervalId = setInterval(() => {
      if (this.remainingTime() > 0) {
        this.remainingTime.update((v) => v - 1);
      } else {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
