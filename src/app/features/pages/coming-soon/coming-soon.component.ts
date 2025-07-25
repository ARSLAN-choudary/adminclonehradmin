import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-coming-soon',
  imports: [],
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss'] // ✅ Should be style**Urls**
})
export class ComingSoonComponent implements OnInit, OnDestroy {
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  countdownExpired = false;
  email = '';

  private countdownInterval: ReturnType<typeof setInterval> | undefined;

  ngOnInit(): void {
    this.setCountdown();
  }

  ngOnDestroy(): void {
    clearInterval(this.countdownInterval);
  }

  private setCountdown(): void {
    const countdownDate = new Date('Jul 02, 2026 16:00:00').getTime(); // 🔄 Updated to 2025 if needed

    this.countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance < 0) {
        clearInterval(this.countdownInterval);
        this.countdownExpired = true;
        this.days = this.hours = this.minutes = this.seconds = 0;
        return;
      }

      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    }, 1000);
  }
}
