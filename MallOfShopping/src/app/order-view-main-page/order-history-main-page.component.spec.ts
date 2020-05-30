import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryMainPageComponent } from './order-history-main-page.component';

describe('OrderViewMainPageComponent', () => {
  let component: OrderHistoryMainPageComponent;
  let fixture: ComponentFixture<OrderHistoryMainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderHistoryMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
