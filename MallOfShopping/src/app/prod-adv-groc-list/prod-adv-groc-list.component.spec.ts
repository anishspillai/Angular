import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdAdvGrocListComponent } from './prod-adv-groc-list.component';

describe('ProdAdvGrocListComponent', () => {
  let component: ProdAdvGrocListComponent;
  let fixture: ComponentFixture<ProdAdvGrocListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdAdvGrocListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdAdvGrocListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
