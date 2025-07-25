import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { routes } from '../../../../shared/routes/routes';

@Component({
  selector: 'app-deals-details',
  imports: [CommonModule,MatSelectModule,BsDatepickerModule,RouterLink],
  templateUrl: './deals-details.component.html',
  styleUrl: './deals-details.component.scss'
})
export class DealsDetailsComponent {
  routes=routes
selectedFieldSet=[0]
  trash:boolean=false;
isTrash():void{
  this.trash=true;
}
  formData: any[][] = []; 

  addNewRow(i:number) {
     if (!this.formData[i]) {
    this.formData[i] = []; // Initialize as empty array if undefined
  }
  this.formData[i].push({});
  }

removeRow(rowIndex: number, sectionIndex: number) {
  const section = this.formData[sectionIndex];
  if (Array.isArray(section)) {
    section.splice(rowIndex, 1);
  }
}

  trackByIndex(index: number, item: any) {
    return index;
  }
}
