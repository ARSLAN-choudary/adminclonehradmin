import { Component } from '@angular/core';
import { routes } from '../../shared/routes/routes';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterLink,FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  public routes = routes
  constructor(private router: Router) {}

  public navigate() {
    this.router.navigate([routes.emailVerification]);
  }
}
