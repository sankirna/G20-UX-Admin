import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedListModel } from 'src/app/models/base-paged-list.model';
import { StateModel, StateSearchModel } from 'src/app/models/state.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor(private http: HttpClient) { }

  list(model: StateSearchModel) {
    const api = 'State/List';
    return this.http.post<PagedListModel<StateModel>>(api, model, { params: { isPageType: true } });
  }

  get(id: number) {
    const api = 'State/get';
    return this.http.post<StateModel>(api, null, { params: { id: id } });
  }

  create(model: StateModel) {
    const api = 'State/Create';
    return this.http.post<StateModel>(api, model);
  }

  update(model: StateModel) {
    const api = 'State/update';
    return this.http.post<StateModel>(api, model);
  }

  delete(id: number) {
    const api = 'State/delete';
    return this.http.post<number>(api, null, { params: { id: id } });
  }
}
