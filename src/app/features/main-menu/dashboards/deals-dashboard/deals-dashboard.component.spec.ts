import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsDashboardComponent } from './deals-dashboard.component';

describe('DealsDashboardComponent', () => {
  let component: DealsDashboardComponent;
  let fixture: ComponentFixture<DealsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealsDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
