import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { IngredientService } from './ingredient.service';

describe('IngredientService', () => {
  let httpTestingController: HttpTestingController
  let service: IngredientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(IngredientService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getIngredients',  () => {
    it('should call http client ge eith /api/ingredient',async () => {
      const ingredientsPromise = service.getIngredients();

      httpTestingController.expectOne('http://localhost:5000/api/ingredient');

      expect(await ingredientsPromise).toEqual([]);

      httpTestingController.verify();
    });
  })

});
