import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearCacheComponent } from './clear-cache.component';

describe('ClearCacheComponent', () => {
  let component: ClearCacheComponent;
  let fixture: ComponentFixture<ClearCacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClearCacheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClearCacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
