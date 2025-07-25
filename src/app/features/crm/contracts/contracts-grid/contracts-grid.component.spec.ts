import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsGridComponent } from './contracts-grid.component';

describe('ContractsGridComponent', () => {
  let component: ContractsGridComponent;
  let fixture: ComponentFixture<ContractsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractsGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
