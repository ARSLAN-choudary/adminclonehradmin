import { Component, computed, signal, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app-register.component.html',
  styleUrls: ['./app-register.component.scss'],
})
export class AppRegisterComponent implements OnInit {
  // --- Signals ---
  country = signal<string>('');
  position = signal<string>('');
  email = signal<string>('');
  loading = signal<boolean>(false);
  errorMessage = signal<string>('');
  showAppDownloadDialog = signal<boolean>(false);

  countryPositions: any = ['Manager', 'Developer', 'Designer', 'HR Manager', 'Sales Executive']
  // --- Computed Signals ---
  showPositionField = computed(() => !!this.country());
  showEmailField = computed(() => !!this.country() && !!this.position());
  isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email()));
  isStep1Valid = computed(() => !!this.country() && !!this.position() && this.isEmailValid());
  showSendOtpButton = computed(() => !!this.country() && !!this.position() && !!this.email());

  // --- Flags ---
  private fromApp: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private http: HttpClient
  ) { }

  // --- Auto Fetch Country ---
  ngOnInit() {
    // ✅ Detect if page opened from Flutter app
    this.route.queryParams.subscribe(params => {
      this.fromApp = params['from'] === 'app'; // ← Flutter will open URL with ?from=app
    });

    this.detectUserCountry();
  }

  private detectUserCountry() {
    this.http.get<any>('https://ipwho.is/')
      .subscribe({
        next: (data) => {
          const countryName = data.country;
          this.country.set(countryName);
          console.log('countryName', countryName);
        },
        error: (err) => console.error('❌ Failed to detect country:', err),
      });
  }

  

  // --- Handlers ---
  onCountryChange(event: any) {
    this.country.set(event.target.value);
    this.position.set('');
    this.email.set('');
  }

  onPositionChange(event: any) {
    this.position.set(event.target.value);
  }

  onEmailInput(event: any) {
    this.email.set(event.target.value);
  }


  // --- Send OTP ---
  sendOtp() {
    if (!this.email()) return;

    this.loading.set(true);
    this.errorMessage.set('');

    const payload = {
      email: this.email(),
      position: this.position(),
      location: this.country(),
    };

    this.authService.verifyRegister(payload).subscribe({
      next: (res: any) => {
        this.loading.set(false);

        // ✅ Forward "from=app" param if it exists
        const queryParams: any = { email: this.email() };
        if (this.fromApp) queryParams.from = 'app';

        this.router.navigate(['/two-step-verification'], {
          queryParams,
        });

        // ✅ Trigger deep link for ALL cases (browser + app both)
        this.onSignUpSuccess({
          email: this.email(),
          position: this.position(),
          country: this.country(),
        });
      },
      error: (err: any) => {
        this.loading.set(false);
        this.errorMessage.set(err?.error?.message || 'Failed to send OTP');
      },
    });
  }


  // --- Deep Link Logic ---
  onSignUpSuccess(userData: any) {
    const otpPageUrl = '/two-step-verification';
    const flutterUrl = `blacklane://registered?email=${encodeURIComponent(
      userData.email
    )}&position=${encodeURIComponent(userData.position)}&country=${encodeURIComponent(
      userData.country
    )}&redirect=${encodeURIComponent(otpPageUrl)}`;

    // 🔹 Always open the app (both web & Flutter)
    window.location.href = flutterUrl;

    // 🔹 Show alert ONLY if not opened from app
    setTimeout(() => {
      if (!document.hidden && !this.fromApp) {
        alert('Please open the Blacklane app to complete registration!');
        this.showAppDownloadDialog.set(true);
      }
    }, 1000);
  }
}
