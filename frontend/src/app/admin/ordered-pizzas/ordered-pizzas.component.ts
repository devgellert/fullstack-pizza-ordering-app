import { Component, Inject ,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Order } from '../../services/order'
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-ordered-pizzas',
  templateUrl: './ordered-pizzas.component.html',
  styleUrls: ['./ordered-pizzas.component.css']
})
export class OrderedPizzasComponent implements OnInit {
  order?: Order;


  constructor(
    //private order1: Order,
    private orderService: OrderService,
    private dialogRef: MatDialogRef<OrderedPizzasComponent>,
    @Inject(MAT_DIALOG_DATA) private id: number | undefined
  ) {
    //console.log(this.id)
  }

  async ngOnInit(): Promise<void> {
     this.order = await this.orderService.getOrder(this.id);
  }

  submit(event: any){
    this.dialogRef.close();
  }


}
