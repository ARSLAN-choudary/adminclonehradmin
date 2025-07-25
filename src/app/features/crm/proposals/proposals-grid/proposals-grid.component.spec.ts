import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalsGridComponent } from './proposals-grid.component';

describe('ProposalsGridComponent', () => {
  let component: ProposalsGridComponent;
  let fixture: ComponentFixture<ProposalsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalsGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
