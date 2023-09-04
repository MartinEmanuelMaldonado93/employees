import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { AppComponent } from '../app.component';
import { OrderRoutingModule } from './orders-routing.module';

@NgModule({
  declarations: [OrderComponent],
  imports: [CommonModule, OrderRoutingModule],
  bootstrap: [AppComponent],
})
export class OrdersModule {}
