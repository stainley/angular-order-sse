import {Component, OnInit} from '@angular/core';
import {OrderService} from "../service/order.service";
import {Order} from "../model/order";

@Component({
  selector: 'app-order',
  template: `
    <h1>Order Updates</h1>
    <ul>
      <li class="row" *ngFor="let order of orders">

        <div>
          <span class="data">Order ID: {{ order.orderId }} - Customer Id: {{ order.customerId }}
            - Quantity: {{ order.quantity }}</span>
        </div>

      </li>
    </ul>
  `,
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  orders: Order[] = [];

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.getServerSentEvent("http://localhost:8081/product-updates")
      .subscribe({
        next: order => {
          this.orders.push(order);
          if (this.orders.length > 10) {
            this.orders.shift(); // Remove the oldest event
          }
        },
        error: error => console.log(`Error in SSE stream: ${error}`),
      });
  };


}
