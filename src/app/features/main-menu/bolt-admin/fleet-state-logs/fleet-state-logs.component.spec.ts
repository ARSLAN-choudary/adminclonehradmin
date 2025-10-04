import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetStateLogsComponent } from './fleet-state-logs.component';

describe('FleetStateLogsComponent', () => {
  let component: FleetStateLogsComponent;
  let fixture: ComponentFixture<FleetStateLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetStateLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetStateLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
