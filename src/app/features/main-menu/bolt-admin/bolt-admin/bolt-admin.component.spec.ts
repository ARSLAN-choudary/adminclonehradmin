import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoltAdminComponent } from './bolt-admin.component';

describe('BoltAdminComponent', () => {
  let component: BoltAdminComponent;
  let fixture: ComponentFixture<BoltAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoltAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoltAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
