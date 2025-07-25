import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityMailComponent } from './activity-mail.component';

describe('ActivityMailComponent', () => {
  let component: ActivityMailComponent;
  let fixture: ComponentFixture<ActivityMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityMailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
