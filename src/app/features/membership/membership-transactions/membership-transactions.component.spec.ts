import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipTransactionsComponent } from './membership-transactions.component';

describe('MembershipTransactionsComponent', () => {
  let component: MembershipTransactionsComponent;
  let fixture: ComponentFixture<MembershipTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipTransactionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
