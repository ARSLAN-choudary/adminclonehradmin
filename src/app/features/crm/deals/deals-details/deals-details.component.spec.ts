import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsDetailsComponent } from './deals-details.component';

describe('DealsDetailsComponent', () => {
  let component: DealsDetailsComponent;
  let fixture: ComponentFixture<DealsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
