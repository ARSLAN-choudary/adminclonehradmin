import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignArchieveComponent } from './campaign-archieve.component';

describe('CampaignArchieveComponent', () => {
  let component: CampaignArchieveComponent;
  let fixture: ComponentFixture<CampaignArchieveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignArchieveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignArchieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
