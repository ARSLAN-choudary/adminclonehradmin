import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-and-conditions',
  imports: [FormsModule],
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.scss'
})
export class TermsAndConditionsComponent {
term1 = false;
term2 = false;
term3 = false;
term4 = false;
term5 = false;

constructor(private router:Router){}

allChecked() {
  return this.term1 && this.term2 && this.term3 && this.term4 && this.term5;
}

agreeAndContinue() {
  if (!this.allChecked()) return;
  this.router.navigate(['/dashboard']);
}

goBack() {
  this.router.navigate(['/']);
}

}
