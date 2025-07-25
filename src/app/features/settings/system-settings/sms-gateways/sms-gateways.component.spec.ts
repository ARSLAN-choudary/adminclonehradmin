import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsGatewaysComponent } from './sms-gateways.component';

describe('SmsGatewaysComponent', () => {
  let component: SmsGatewaysComponent;
  let fixture: ComponentFixture<SmsGatewaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmsGatewaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsGatewaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
