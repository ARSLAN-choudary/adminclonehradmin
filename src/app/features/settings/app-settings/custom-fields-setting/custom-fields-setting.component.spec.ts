import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFieldsSettingComponent } from './custom-fields-setting.component';

describe('CustomFieldsSettingComponent', () => {
  let component: CustomFieldsSettingComponent;
  let fixture: ComponentFixture<CustomFieldsSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomFieldsSettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomFieldsSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
