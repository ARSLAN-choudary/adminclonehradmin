import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nda-agreement',
  imports: [FormsModule],
  templateUrl: './nda-agreement.component.html',
  styleUrl: './nda-agreement.component.scss'
})
export class NdaAgreementComponent {
 ndaAgree: boolean = false;

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']); 
  }

  agreeAndContinue() {
    if (this.ndaAgree) {

      this.router.navigate(['/next-step']);  
    }
  }
}
