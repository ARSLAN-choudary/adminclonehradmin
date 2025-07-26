import {Component} from '@angular/core';
import {routes} from '../../shared/routes/routes';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-email-verification',
    imports: [FormsModule],
    templateUrl: './email-verification.component.html',
    styleUrl: './email-verification.component.scss'
})
export class EmailVerificationComponent {
    currentYear: any;
    routes = routes;

    constructor(private router: Router) {

        this.currentYear = new Date().getFullYear();
    }

    navigation() {
        this.router.navigate([routes.twoStepVerfication])
    }
}
