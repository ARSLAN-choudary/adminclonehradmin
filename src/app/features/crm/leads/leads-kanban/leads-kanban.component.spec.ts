import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsKanbanComponent } from './leads-kanban.component';

describe('LeadsKanbanComponent', () => {
  let component: LeadsKanbanComponent;
  let fixture: ComponentFixture<LeadsKanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadsKanbanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadsKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
