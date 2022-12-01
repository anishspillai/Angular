import "zone.js/dist/zone";
import 'zone.js/dist/zone-testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOrderedItemsComponent } from './review-ordered-items.component';
import {GroceryService} from "../grocery-grid/grocery.service";
import {AddGroceryToListObservableService} from "../add-grocery-to-list-observable.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from "@angular/platform-browser-dynamic/testing";

describe('ReviewOrderedItemsComponent', () => {
  let component: ReviewOrderedItemsComponent;
  let fixture: ComponentFixture<ReviewOrderedItemsComponent>;

  let masterService: GroceryService;
  let valueServiceSpy: jasmine.SpyObj<AddGroceryToListObservableService>;
  let router: Router;
  let authService: AuthService;



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewOrderedItemsComponent ],
      providers: [
        GroceryService,
        AddGroceryToListObservableService,
        Router,
        AuthService
      ]
    })

    // masterService = TestBed.inject(masterService);
    // valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  }));

  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule,
      platformBrowserDynamicTesting());
    fixture = TestBed.createComponent(ReviewOrderedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
