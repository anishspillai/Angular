import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductIndGroceryComponent } from './new-product-ind-grocery.component';

describe('NewProductIndGroceryComponent', () => {
  let component: NewProductIndGroceryComponent;
  let fixture: ComponentFixture<NewProductIndGroceryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProductIndGroceryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductIndGroceryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
