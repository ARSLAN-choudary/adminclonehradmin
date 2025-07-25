import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRequestComponent } from './delete-request.component';

describe('DeleteRequestComponent', () => {
  let component: DeleteRequestComponent;
  let fixture: ComponentFixture<DeleteRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
