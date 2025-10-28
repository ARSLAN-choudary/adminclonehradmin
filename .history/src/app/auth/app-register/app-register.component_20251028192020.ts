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
  isRegistered = signal<boolean>(false); // ✅ Added for success screen toggle

  // --- Country → Positions Mapping ---
  private countryPositions: { [key: string]: string[] } = {
    "United States": ['Manager', 'Developer', 'Designer', 'HR Manager', 'Sales Executive'],
    "India": ['Team Lead', 'Software Engineer', 'UI/UX Designer', 'Project Manager', 'Business Analyst'],
    "United Kingdom": ['Director', 'Senior Developer', 'Product Designer', 'Operations Manager', 'Marketing Head'],
    "Canada": ['Tech Lead', 'Full Stack Developer', 'Frontend Developer', 'System Admin', 'Data Analyst'],
    "Australia": ['CEO', 'CTO', 'Product Manager', 'DevOps Engineer', 'Quality Analyst'],
  };

  // --- Computed Signals ---
  availablePositions = computed(() => this.countryPositions[this.country()] || []);
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
    this.route.queryParams.subscribe(params => {
      this.fromApp = params['from'] === 'app';
    });
    this.detectUserCountry();
  }

  private detectUserCountry() {
    this.http.get<any>('https://ipapi.co/json/')
      .subscribe({
        next: (data) => {
          const countryName = data.country_name;
          const validCountries = Object.keys(this.countryPositions);
          if (validCountries.includes(countryName)) {
            this.country.set(countryName);
          }
        },
        error: (err) => console.error('❌ Failed to detect country:', err),
      });
  }

  // --- Handlers ---
  onCountryChange(event: any) {
    this.country.set(event.target.value);
    this.position.set('');
    this.email.set('');
    this.isRegistered.set(false);
  }

  onPositionChange(event: any) {
    this.position.set(event.target.value);
    this.email.set('');
    if (this.position()) {
      this.confirmPosition(); // ✅ Show success screen immediately
    }
  }

  onEmailInput(event: any) {
    this.email.set(event.target.value);
  }

  // ✅ New function: show success message when position selected
  confirmPosition() {
    this.isRegistered.set(true);
  }

  // ✅ Back to registration
  resetForm() {
    this.isRegistered.set(false);
    this.position.set('');
    this.email.set('');
  }

  // --- Send OTP ---
  sendOtp() {
    if (!this.isStep1Valid()) return;

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

        const queryParams: any = { email: this.email() };
        if (this.fromApp) queryParams.from = 'app';

        this.router.navigate(['/two-step-verification'], {
          queryParams,
        });

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

    window.location.href = flutterUrl;

    setTimeout(() => {
      if (!document.hidden && !this.fromApp) {
        alert('Please open the Blacklane app to complete registration!');
        this.showAppDownloadDialog.set(true);
      }
    }, 1000);
  }
}
