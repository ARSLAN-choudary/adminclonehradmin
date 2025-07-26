import {Component, OnInit} from '@angular/core';
import {routes} from '../../shared/routes/routes';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-login',
    imports: [CommonModule, RouterLink, FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
     currentYear: any;
    ngOnInit() {
        this.currentYear = new Date().getFullYear();

    }

    routes = routes;

    constructor(private router: Router) {
    }

    public navigate() {
        this.router.navigate([routes.index]);
    }

    public password: boolean[] = [false];

    public togglePassword(index: any) {
        this.password[index] = !this.password[index]
    }
}
