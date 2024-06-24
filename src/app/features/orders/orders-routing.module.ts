import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      { path: 'list', component: OrderListComponent },
      { path: 'detail/:id', component: OrderDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
