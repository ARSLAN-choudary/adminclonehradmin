import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageWebComponent } from './language-web.component';

describe('LanguageWebComponent', () => {
  let component: LanguageWebComponent;
  let fixture: ComponentFixture<LanguageWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageWebComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
