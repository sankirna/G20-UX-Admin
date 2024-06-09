import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedListModel } from 'src/app/models/base-paged-list.model';
import { CouponModel, CouponSearchModel } from 'src/app/models/coupon.model';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  constructor(private http: HttpClient) { }

  list(model: CouponSearchModel) {
    const api = 'Coupon/List';
    return this.http.post<PagedListModel<CouponModel>>(api, model, { params: { isPageType: true } });
  }

  get(id: number) {
    const api = 'Coupon/Get';
    return this.http.post<CouponModel>(api, null, { params: { id: id } });
  }

  create(model: CouponModel) {
    const api = 'Coupon/Create';
    return this.http.post<CouponModel>(api, model);
  }

  update(model: CouponModel) {
    const api = 'Coupon/Update';
    return this.http.post<CouponModel>(api, model);
  }

  delete(id: number) {
    const api = 'Coupon/Delete';
    return this.http.post<number>(api, null, { params: { id: id } });
  }
}
