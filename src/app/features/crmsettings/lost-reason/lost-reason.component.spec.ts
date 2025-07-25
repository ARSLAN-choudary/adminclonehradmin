import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostReasonComponent } from './lost-reason.component';

describe('LostReasonComponent', () => {
  let component: LostReasonComponent;
  let fixture: ComponentFixture<LostReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LostReasonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LostReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
