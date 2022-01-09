import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedPizzasComponent } from './ordered-pizzas.component';

describe('OrderedPizzasComponent', () => {
  let component: OrderedPizzasComponent;
  let fixture: ComponentFixture<OrderedPizzasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderedPizzasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedPizzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
