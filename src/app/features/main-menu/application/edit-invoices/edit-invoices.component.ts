import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-invoices',
   imports: [MatSelectModule,BsDatepickerModule,FormsModule,CommonModule,RouterLink],
  templateUrl: './edit-invoices.component.html',
  styleUrl: './edit-invoices.component.scss'
})
export class EditInvoicesComponent {
  routes=routes
  trash:boolean=false;
isTrash():void{
  this.trash=true;
}
formData: any[] = []; 

  addNewRow() {
    this.formData.push({});
  }

  removeRow(index: number) {
      this.formData.splice(index, 1);
  }
  trackByIndex(index: number, item: any) {
    return index;
  }

}
