
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderService} from "./service/order.service";
import {OrderComponent} from "./component/order.component";

@NgModule({
  declarations: [OrderComponent],
  imports: [CommonModule],
  providers: [OrderService],
  exports: [
    OrderComponent
  ]
})
export class OrderModule {

}
