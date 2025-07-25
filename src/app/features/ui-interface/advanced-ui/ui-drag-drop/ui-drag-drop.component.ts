import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';



@Component({
    selector: 'app-ui-drag-drop',
    templateUrl: './ui-drag-drop.component.html',
    styleUrl: './ui-drag-drop.component.scss',
    imports: [CdkDrag,CommonModule,RouterLink]
})
export class UiDragDropComponent {
  routes=routes
  isFullscreen = false;
  
  public dragCardOne = [
    {
      tittle: 'The best and most beautiful things in the world cannot be seen or even touched — they must be felt with the heart..',
      content:
        'Someone famous as ',
        person:'-Helen Keller'
    },
    
   
  ];
  public basicListGroup = [
    {
      tittle: 'Card With Fullscreen Button',
      person:
        'FullScreen Card',
        content:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words',
      
    },
   
  ];

  public todoList = [
    'Cras justo odio',
    'Dapibus ac facilisis in',
    'Morbi leo risus',
    'Porta ac consectetur ac',
    'Vestibulum at eros',
  ];
  public doneList = [
    'Cras justo odio',
    'Dapibus ac facilisis in',
    'Morbi leo risus',
    'Porta ac consectetur ac',
    'Vestibulum at eros',
  ];
  drop(event: CdkDragDrop<''>) {
    moveItemInArray(
      this.basicListGroup,
      event.previousIndex,
      event.currentIndex
    );
  }

  dropTodo(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
   
  }
  isCardFullscreen = false;

  toggleFullscreen() {
    this.isCardFullscreen = !this.isCardFullscreen;
  }
  isCardVisible = true;

  toggleCardVisibility() {
    this.isCardVisible = !this.isCardVisible;
  }
}
