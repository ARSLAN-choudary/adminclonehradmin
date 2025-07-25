import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsKanbanComponent } from './deals-kanban.component';

describe('DealsKanbanComponent', () => {
  let component: DealsKanbanComponent;
  let fixture: ComponentFixture<DealsKanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealsKanbanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealsKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
