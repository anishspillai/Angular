import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatePoliciesComponent } from './private-policies.component';

describe('PrivatePoliciesComponent', () => {
  let component: PrivatePoliciesComponent;
  let fixture: ComponentFixture<PrivatePoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivatePoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatePoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
