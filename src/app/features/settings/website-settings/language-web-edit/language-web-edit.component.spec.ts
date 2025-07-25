import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageWebEditComponent } from './language-web-edit.component';

describe('LanguageWebEditComponent', () => {
  let component: LanguageWebEditComponent;
  let fixture: ComponentFixture<LanguageWebEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageWebEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageWebEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
