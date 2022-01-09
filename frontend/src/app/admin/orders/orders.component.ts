import { Component, OnInit } from '@angular/core';
import { Order } from '../../services/order';
import { OrderService } from '../../services/order.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders?: Order[];

  constructor(private orderService: OrderService) { }

  async ngOnInit(): Promise<void> {
    this.orders = await this.orderService.getOrders();
  }

}
