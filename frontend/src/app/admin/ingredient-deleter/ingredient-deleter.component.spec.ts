import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientDeleterComponent } from './ingredient-deleter.component';

describe('IngredientDeleterComponent', () => {
  let component: IngredientDeleterComponent;
  let fixture: ComponentFixture<IngredientDeleterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientDeleterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientDeleterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
