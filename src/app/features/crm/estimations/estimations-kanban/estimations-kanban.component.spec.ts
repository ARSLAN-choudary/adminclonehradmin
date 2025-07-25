import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimationsKanbanComponent } from './estimations-kanban.component';

describe('EstimationsKanbanComponent', () => {
  let component: EstimationsKanbanComponent;
  let fixture: ComponentFixture<EstimationsKanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstimationsKanbanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstimationsKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
