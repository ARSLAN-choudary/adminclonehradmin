import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealReportsComponent } from './deal-reports.component';

describe('DealReportsComponent', () => {
  let component: DealReportsComponent;
  let fixture: ComponentFixture<DealReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
