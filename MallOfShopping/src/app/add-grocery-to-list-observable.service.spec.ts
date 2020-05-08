import { TestBed } from '@angular/core/testing';

import { AddGroceryToListObservableService } from './add-grocery-to-list-observable.service';

describe('AddGroceryToListObservableService', () => {
  let service: AddGroceryToListObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddGroceryToListObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
