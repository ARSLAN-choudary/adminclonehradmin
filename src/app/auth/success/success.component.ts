import {Component, OnInit} from '@angular/core';
import {routes} from '../../shared/routes/routes';
import {Router, RouterLink} from '@angular/router';

@Component({
    selector: 'app-success',
    imports: [RouterLink],
    templateUrl: './success.component.html',
    styleUrl: './success.component.scss'
})
export class SuccessComponent implements OnInit {
     currentYear: any;
    ngOnInit() {
        this.currentYear = new Date().getFullYear();

    }

    routes = routes

}
