import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksImportantComponent } from './tasks-important.component';

describe('TasksImportantComponent', () => {
  let component: TasksImportantComponent;
  let fixture: ComponentFixture<TasksImportantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksImportantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksImportantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
