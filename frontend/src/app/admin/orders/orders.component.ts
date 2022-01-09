import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Order } from '../../services/order';
import { OrderService } from '../../services/order.service';
import { OrderedPizzasComponent } from '../ordered-pizzas/ordered-pizzas.component';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders?: Order[];

  constructor(private orderService: OrderService, private dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.orders = await this.orderService.getOrders();
  }

  async onWatchPizzas(id: number | undefined){
    const dialogRef = this.dialog.open(OrderedPizzasComponent,{
      width: '500px',
      data: id,
    });
    await dialogRef.afterClosed().toPromise();
  }

}
