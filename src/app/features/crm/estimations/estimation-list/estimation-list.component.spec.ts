import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimationListComponent } from './estimation-list.component';

describe('EstimationListComponent', () => {
  let component: EstimationListComponent;
  let fixture: ComponentFixture<EstimationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstimationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstimationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
