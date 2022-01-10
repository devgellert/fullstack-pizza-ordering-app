import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPizzaEditComponent } from './admin-pizza-edit.component';

xdescribe('AdminPizzaEditComponent', () => {
  let component: AdminPizzaEditComponent;
  let fixture: ComponentFixture<AdminPizzaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPizzaEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPizzaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
