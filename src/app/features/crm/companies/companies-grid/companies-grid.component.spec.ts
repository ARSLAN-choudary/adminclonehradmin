import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesGridComponent } from './companies-grid.component';

describe('CompaniesGridComponent', () => {
  let component: CompaniesGridComponent;
  let fixture: ComponentFixture<CompaniesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompaniesGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompaniesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
