import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsMainPageComponent } from './user-details-main-page.component';

describe('UserDetailsMainPageComponent', () => {
  let component: UserDetailsMainPageComponent;
  let fixture: ComponentFixture<UserDetailsMainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
