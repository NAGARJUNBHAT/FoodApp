import { TestBed } from '@angular/core/testing';

import { FoodproductService } from './foodproduct.service';

describe('FoodproductService', () => {
  let service: FoodproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
