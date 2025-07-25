import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { DataService } from '../../../../shared/data/data.service';
import { PaginationService } from '../../../../shared/custom-pagination/pagination.service';
import { Router, RouterLink } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSelectModule } from '@angular/material/select';
import { TagInputModule } from 'ngx-chips';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-estimations-kanban',
  imports: [DragDropModule,MatSelectModule,TagInputModule,CommonModule,FormsModule,NgxEditorModule,BsDatepickerModule,RouterLink],
  templateUrl: './estimations-kanban.component.html',
  styleUrl: './estimations-kanban.component.scss'
})
export class EstimationsKanbanComponent {
  public routes = routes
  tags=['Tag1','Tag2']
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router
  ) {
    
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
   
  }
  public sidebarPopup = false;
  public sidebarPopup2 = false;
  openSidebarPopup() {
    this.sidebarPopup = !this.sidebarPopup;
  }
  openSidebarPopup2() {
    this.sidebarPopup2 = !this.sidebarPopup2;
  }


     editor!: Editor;
  editor1!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic', 'format_clear'],
    ['underline', 'strike'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['image'],
    ['link'],
  ];

ngOnInit(): void {
    this.editor = new Editor();
    this.editor1 = new Editor();
  }
  ngOnDestroy(): void {
    this.editor.destroy();
    this.editor1.destroy();
  }
}
