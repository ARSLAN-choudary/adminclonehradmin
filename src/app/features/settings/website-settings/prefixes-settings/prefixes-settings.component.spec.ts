import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefixesSettingsComponent } from './prefixes-settings.component';

describe('PrefixesSettingsComponent', () => {
  let component: PrefixesSettingsComponent;
  let fixture: ComponentFixture<PrefixesSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrefixesSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrefixesSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
