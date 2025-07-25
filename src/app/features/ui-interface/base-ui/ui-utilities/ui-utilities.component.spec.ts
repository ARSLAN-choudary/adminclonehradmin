import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiUtilitiesComponent } from './ui-utilities.component';

describe('UiUtilitiesComponent', () => {
  let component: UiUtilitiesComponent;
  let fixture: ComponentFixture<UiUtilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiUtilitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiUtilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
