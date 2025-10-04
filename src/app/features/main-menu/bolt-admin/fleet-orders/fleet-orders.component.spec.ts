import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetOrdersComponent } from './fleet-orders.component';

describe('FleetOrdersComponent', () => {
  let component: FleetOrdersComponent;
  let fixture: ComponentFixture<FleetOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
