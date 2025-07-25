import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseBackupComponent } from './database-backup.component';

describe('DatabaseBackupComponent', () => {
  let component: DatabaseBackupComponent;
  let fixture: ComponentFixture<DatabaseBackupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatabaseBackupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabaseBackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
