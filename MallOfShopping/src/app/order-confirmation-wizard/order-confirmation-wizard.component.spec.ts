import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmationWizardComponent } from './order-confirmation-wizard.component';

describe('OrderConfirmationWizardComponent', () => {
  let component: OrderConfirmationWizardComponent;
  let fixture: ComponentFixture<OrderConfirmationWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderConfirmationWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmationWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
