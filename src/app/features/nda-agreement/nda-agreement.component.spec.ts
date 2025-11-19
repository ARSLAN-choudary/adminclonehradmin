import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NdaAgreementComponent } from './nda-agreement.component';

describe('NdaAgreementComponent', () => {
  let component: NdaAgreementComponent;
  let fixture: ComponentFixture<NdaAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NdaAgreementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NdaAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
