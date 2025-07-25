import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataService } from '../../../shared/data/data.service';

@Component({
    selector: 'app-collapse-header',
    templateUrl: './collapse-header.component.html',
    styleUrl: './collapse-header.component.scss',
     imports: [
    CommonModule,
    MatTooltipModule
  ],
})
export class CollapseHeaderComponent {
  public isCollapsed = false;

  toggleCollapse() {
    this.data.toggleCollapse();
    this.isCollapsed = !this.isCollapsed;
  }
  constructor(private data: DataService) {}
}
