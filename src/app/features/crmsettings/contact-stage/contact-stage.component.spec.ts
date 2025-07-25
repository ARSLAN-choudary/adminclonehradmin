import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactStageComponent } from './contact-stage.component';

describe('ContactStageComponent', () => {
  let component: ContactStageComponent;
  let fixture: ComponentFixture<ContactStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
