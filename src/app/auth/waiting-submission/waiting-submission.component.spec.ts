import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingSubmissionComponent } from './waiting-submission.component';

describe('WaitingSubmissionComponent', () => {
  let component: WaitingSubmissionComponent;
  let fixture: ComponentFixture<WaitingSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaitingSubmissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitingSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
