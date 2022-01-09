import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderViewService } from '../../services/order-view.service';
import { ApiOrder } from '../../types/api';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css'],
})
export class OrderViewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private orderViewService: OrderViewService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((value) => {
      const id: number = (value as any).id;

      this.orderViewService.hydrateOrder(id);
    });
  }

  getOrder(): ApiOrder | null {
    return this.orderViewService.getOrder();
  }
}
