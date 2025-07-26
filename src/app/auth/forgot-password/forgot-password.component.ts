import {Component} from '@angular/core';
import {routes} from '../../shared/routes/routes';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-forgot-password',
    imports: [RouterLink, FormsModule],
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
    currentYear: any;

    public routes = routes

    constructor(private router: Router) {


        this.currentYear = new Date().getFullYear();

    }

    public navigate() {
        this.router.navigate([routes.emailVerification]);
    }
}
