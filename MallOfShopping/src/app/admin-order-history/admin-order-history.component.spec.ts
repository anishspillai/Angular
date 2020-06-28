import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderHistoryComponent } from './admin-order-history.component';

describe('AdminOrderHistoryComponent', () => {
  let component: AdminOrderHistoryComponent;
  let fixture: ComponentFixture<AdminOrderHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrderHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
