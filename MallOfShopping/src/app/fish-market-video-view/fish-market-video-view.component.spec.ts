import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FishMarketVideoViewComponent } from './fish-market-video-view.component';

describe('FishMarketVideoViewComponent', () => {
  let component: FishMarketVideoViewComponent;
  let fixture: ComponentFixture<FishMarketVideoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FishMarketVideoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FishMarketVideoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
