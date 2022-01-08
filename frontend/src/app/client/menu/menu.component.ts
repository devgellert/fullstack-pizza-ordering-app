import { Component, OnInit } from '@angular/core';
import {MenuService} from "../../services/menu.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.hydratePizzas();
    console.log(this.getPizzas())
  }

  getPizzas() {
    return this.menuService.getPizzas();
  }
}
