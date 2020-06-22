import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOptionViewComponent } from './payment-option-view.component';

describe('PaymentOptionViewComponent', () => {
  let component: PaymentOptionViewComponent;
  let fixture: ComponentFixture<PaymentOptionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentOptionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOptionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
