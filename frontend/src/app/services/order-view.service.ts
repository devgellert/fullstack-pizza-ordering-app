import { Injectable } from '@angular/core';
import { ApiOrder } from '../types/api';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class OrderViewService {
  private order: ApiOrder | null = null;

  constructor(private apiService: ApiService) {}

  async hydrateOrder(orderId: number) {
    try {
      this.order = await this.apiService.getOrder(orderId);
    } catch (e) {
      console.error(e);
    }
  }

  getOrder(): ApiOrder | null {
    return this.order;
  }
}
