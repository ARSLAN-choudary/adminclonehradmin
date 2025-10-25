import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app-register.component.html',
  styleUrls: ['./app-register.component.scss'],
})
export class AppRegisterComponent {
  // --- Signals ---
  country = signal<string>('');
  position = signal<string>('');
  email = signal<string>('');
  loading = signal<boolean>(false);
  errorMessage = signal<string>('');

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

  constructor(private router: Router, private authService: AuthService) {}

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
    country: this.country(), // ✅ correct field name (not location)
  };

  console.log('Sending OTP Payload:', payload);

  this.authService.verifyRegister(payload).subscribe({
    next: (res: any) => {
      console.log('✅ OTP Sent Successfully:', res);
      this.loading.set(false);
      this.router.navigate(['/two-step-verification'], {
        queryParams: { email: this.email() },
      });
    },
    error: (err: any) => {
      console.error('❌ OTP API Error:', err);
      this.loading.set(false);
      this.errorMessage.set(err?.error?.message || 'Failed to send OTP');
    },
  });
}
}
