import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResubmitionDocsComponent } from './resubmition-docs.component';

describe('ResubmitionDocsComponent', () => {
  let component: ResubmitionDocsComponent;
  let fixture: ComponentFixture<ResubmitionDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResubmitionDocsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResubmitionDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
