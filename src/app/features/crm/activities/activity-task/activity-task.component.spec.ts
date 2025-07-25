import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTaskComponent } from './activity-task.component';

describe('ActivityTaskComponent', () => {
  let component: ActivityTaskComponent;
  let fixture: ComponentFixture<ActivityTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
