import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedListModel } from 'src/app/models/base-paged-list.model';
import { TicketCategoryModel, TicketCategorySearchModel } from 'src/app/models/ticket-category.model';

@Injectable({
  providedIn: 'root'
})
export class TicketCategoryService {
  constructor(private http: HttpClient) { }

  list(model: TicketCategorySearchModel) {
    const api = 'TicketCategory/List';
    return this.http.post<PagedListModel<TicketCategoryModel>>(api, model, { params: { isPageType: true } });
  }

  get(id: number) {
    const api = 'TicketCategory/Get';
    return this.http.post<TicketCategoryModel>(api, null, { params: { id: id } });
  }

  create(model: TicketCategoryModel) {
    const api = 'TicketCategory/Create';
    return this.http.post<TicketCategoryModel>(api, model);
  }

  update(model: TicketCategoryModel) {
    const api = 'TicketCategory/Update';
    return this.http.post<TicketCategoryModel>(api, model);
  }

  delete(id: number) {
    const api = 'TicketCategory/Delete';
    return this.http.post<number>(api, null, { params: { id: id } });
  }
}
