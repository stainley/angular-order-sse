import {Injectable, NgZone} from "@angular/core";
import {Observable} from "rxjs";
import {Order} from "../model/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private zone: NgZone) {}

  getServerSentEvent(url: string): Observable<Order> {
    return new Observable(observer => {
      const eventSource = new EventSource(url);

      eventSource.onmessage = event => {
        const jsonData = JSON.parse(event.data);
        console.log(jsonData);

        const order: Order = {
          orderId: jsonData.orderId,
          customerId: jsonData.customerId,
          productId: jsonData.productId,
          quantity: jsonData.quantity,
        }

        this.zone.run(() => observer.next(order));
      };

      eventSource.onerror = error => {
        this.zone.run(() => {
          console.error(`SSE error: ${error}`);
          observer.error(error);
        });
      }

      return () => eventSource.close();
    });
  }
}
