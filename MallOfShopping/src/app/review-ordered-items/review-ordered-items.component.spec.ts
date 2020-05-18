import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOrderedItemsComponent } from './review-ordered-items.component';

describe('ReviewOrderedItemsComponent', () => {
  let component: ReviewOrderedItemsComponent;
  let fixture: ComponentFixture<ReviewOrderedItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewOrderedItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewOrderedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
