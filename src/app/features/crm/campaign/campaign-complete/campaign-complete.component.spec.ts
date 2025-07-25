import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignCompleteComponent } from './campaign-complete.component';

describe('CampaignCompleteComponent', () => {
  let component: CampaignCompleteComponent;
  let fixture: ComponentFixture<CampaignCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignCompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
