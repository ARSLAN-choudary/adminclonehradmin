import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactReportsComponent } from './contact-reports.component';

describe('ContactReportsComponent', () => {
  let component: ContactReportsComponent;
  let fixture: ComponentFixture<ContactReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
