import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkForComponent } from './link-for.component';

describe('LinkForComponent', () => {
  let component: LinkForComponent;
  let fixture: ComponentFixture<LinkForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkForComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
