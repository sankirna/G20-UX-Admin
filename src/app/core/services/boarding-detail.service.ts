import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedListModel } from 'src/app/models/base-paged-list.model';
import { BoardingCheckRequestModel, BoardingDetailModel, BoardingDetailSearchModel } from 'src/app/models/boarding-detail.model';

@Injectable({
  providedIn: 'root'
})
export class BoardingDetailService {
  constructor(private http: HttpClient) { }

  list(model: BoardingDetailSearchModel) {
    const api = 'BoardingDetail/List';
    return this.http.post<PagedListModel<BoardingDetailModel>>(api, model, { params: { isPageType: true } });
  }

  get(id: number) {
    const api = 'BoardingDetail/Get';
    return this.http.post<BoardingDetailModel>(api, null, { params: { id: id } });
  }

  create(model: BoardingDetailModel) {
    const api = 'BoardingDetail/Create';
    return this.http.post<BoardingDetailModel>(api, model);
  }

  update(model: BoardingDetailModel) {
    const api = 'BoardingDetail/Update';
    return this.http.post<BoardingDetailModel>(api, model);
  }

  delete(id: number) {
    const api = 'BoardingDetail/Delete';
    return this.http.post<number>(api, null, { params: { id: id } });
  }

  validateTicket(model: BoardingCheckRequestModel) {
    const api = 'BoardingDetail/ValidateTicket';
    return this.http.post<BoardingCheckRequestModel>(api, model);
  }
}
