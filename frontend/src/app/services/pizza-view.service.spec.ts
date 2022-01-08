import { TestBed } from '@angular/core/testing';

import { PizzaViewService } from './pizza-view.service';

describe('PizzaViewService', () => {
  let service: PizzaViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PizzaViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
