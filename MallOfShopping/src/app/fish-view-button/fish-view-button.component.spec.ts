import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FishViewButtonComponent } from './fish-view-button.component';

describe('FishViewButtonComponent', () => {
  let component: FishViewButtonComponent;
  let fixture: ComponentFixture<FishViewButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FishViewButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FishViewButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
