import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaViewComponent } from './pizza-view.component';

xdescribe('PizzaViewComponent', () => {
  let component: PizzaViewComponent;
  let fixture: ComponentFixture<PizzaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PizzaViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
