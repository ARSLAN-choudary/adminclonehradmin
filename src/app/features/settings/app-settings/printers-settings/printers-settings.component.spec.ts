import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintersSettingsComponent } from './printers-settings.component';

describe('PrintersSettingsComponent', () => {
  let component: PrintersSettingsComponent;
  let fixture: ComponentFixture<PrintersSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintersSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintersSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
