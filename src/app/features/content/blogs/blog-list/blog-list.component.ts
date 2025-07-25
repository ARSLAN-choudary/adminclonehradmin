import { Component } from '@angular/core';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  imports: [CollapseHeaderComponent,RouterLink],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent {
public routes = routes;
}
