import { NgModule } from '@angular/core';
import {  OrdersRoutingModule } from './orders-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderListComponent } from './order-list/order-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { RoleService } from 'src/app/core/services/role.service';
import { OrderService } from 'src/app/core/services/order.service';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { MatTabsModule } from '@angular/material/tabs';
import { OrderInformationComponent } from './shared/order-information/order-information.component';
import { OrderProductItemsComponent } from './shared/order-product-items/order-product-items.component';

@NgModule({
  declarations: [
      OrderListComponent,
      OrderDetailComponent,
      OrderInformationComponent,
      OrderProductItemsComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    OrdersRoutingModule,
    MatTabsModule
  ],
  providers: [
      OrderService
    , RoleService
  ]
})
export class OrdersModule { }
