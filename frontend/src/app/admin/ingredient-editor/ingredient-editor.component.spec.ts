import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientEditorComponent } from './ingredient-editor.component';

xdescribe('IngredientEditorComponent', () => {
  let component: IngredientEditorComponent;
  let fixture: ComponentFixture<IngredientEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
