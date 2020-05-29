import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigatorForMobileDeviceComponent } from './navigator-for-mobile-device.component';

describe('NavigatorForMobileDeviceComponent', () => {
  let component: NavigatorForMobileDeviceComponent;
  let fixture: ComponentFixture<NavigatorForMobileDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigatorForMobileDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigatorForMobileDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
