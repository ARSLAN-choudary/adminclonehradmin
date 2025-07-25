import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityMeetingComponent } from './activity-meeting.component';

describe('ActivityMeetingComponent', () => {
  let component: ActivityMeetingComponent;
  let fixture: ComponentFixture<ActivityMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityMeetingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
