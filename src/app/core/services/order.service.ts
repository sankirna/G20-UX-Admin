import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedListModel } from 'src/app/models/base-paged-list.model';
import { OrderDetailModel, OrderListRequestModel } from 'src/app/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }

  getOrders(model: OrderListRequestModel) {
    const api = 'Order/GetOrders';
    return this.http.post<PagedListModel<OrderDetailModel>>(api, model, { params: { isPageType: true } });
  }
   
  get(orderId: number) {
    const api = 'Order/Get';
    return this.http.post<any>(api, null, { params: { orderId: orderId } });
  }

}
