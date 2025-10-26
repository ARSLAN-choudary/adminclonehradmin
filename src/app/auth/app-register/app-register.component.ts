import { Component, computed, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  country = signal<string>(''); // Will be auto-filled from API
  position = signal<string>('');
  email = signal<string>('');
  loading = signal<boolean>(false);
  errorMessage = signal<string>('');
  showAppDownloadDialog = signal<boolean>(false);

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

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  // --- Auto Fetch Country from IP ---
  ngOnInit() {
    this.http.get<any>('https://ipinfo.io/?token=4917235be334b4').subscribe({
      next: (data) => {
        console.log('🌍 IP Info:', data);
        const countryCode = data.country;

        // Map ISO country codes to readable names
        const countryMap: { [key: string]: string } = {
          US: 'United States',
          IN: 'India',
          GB: 'United Kingdom',
          CA: 'Canada',
          AU: 'Australia',
        };

        const readableCountry = countryMap[countryCode] || '';
        if (readableCountry) {
          this.country.set(readableCountry);
          console.log('✅ Auto-selected country:', readableCountry);
        }
      },
      error: (err) => {
        console.error('❌ Failed to fetch country:', err);
      },
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
    this.email.set('');
  }

  onEmailInput(event: any) {
    this.email.set(event.target.value);
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

    console.log('Sending OTP Payload:', payload);

    this.authService.verifyRegister(payload).subscribe({
      next: (res: any) => {
        console.log('✅ OTP Sent Successfully:', res);
        this.loading.set(false);

        // Navigate to OTP verification page
        this.router.navigate(['/two-step-verification'], {
          queryParams: { email: this.email() },
        });

        // Trigger Flutter deep link
        this.onSignUpSuccess({
          email: this.email(),
          position: this.position(),
          country: this.country(),
        });
      },
      error: (err: any) => {
        console.error('❌ OTP API Error:', err);
        this.loading.set(false);
        this.errorMessage.set(err?.error?.message || 'Failed to send OTP');
      },
    });
  }

  // --- Trigger Flutter App via Deep Link ---
  onSignUpSuccess(userData: any) {
    const flutterUrl = `blacklane://registered?email=${encodeURIComponent(userData.email)}&position=${encodeURIComponent(userData.position)}&country=${encodeURIComponent(userData.country)}`;

    window.location.href = flutterUrl;

    setTimeout(() => {
      if (!document.hidden) {
        alert('Please open the Blacklane app to complete registration!');
        this.showAppDownloadDialog.set(true);
      }
    }, 1000);
  }
}
