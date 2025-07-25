import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCollapseComponent } from './ui-collapse.component';

describe('UiCollapseComponent', () => {
  let component: UiCollapseComponent;
  let fixture: ComponentFixture<UiCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCollapseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
