import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../../services/order'
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  @Input() order!: Order;

  @Output() watchPizzas: EventEmitter<void> = new EventEmitter();

  constructor(
    private orderService: OrderService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  watch(){
    this.watchPizzas.emit()
  }

  async cook(id: number){
    await this.orderService.cookingDone(id);
    await this.router.navigate(['/order', id])
  }

  async deliver(id: number){
    await this.orderService.deliveryDone(id);
    await this.router.navigate(['/order', id])
  }

  async accept(id: number){
    await this.orderService.accepted(id);
    await this.router.navigate(['/order', id])
  }


}
