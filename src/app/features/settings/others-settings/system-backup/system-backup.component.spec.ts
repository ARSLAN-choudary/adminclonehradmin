import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemBackupComponent } from './system-backup.component';

describe('SystemBackupComponent', () => {
  let component: SystemBackupComponent;
  let fixture: ComponentFixture<SystemBackupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemBackupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemBackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
