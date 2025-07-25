import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdprCookiesComponent } from './gdpr-cookies.component';

describe('GdprCookiesComponent', () => {
  let component: GdprCookiesComponent;
  let fixture: ComponentFixture<GdprCookiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GdprCookiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GdprCookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
