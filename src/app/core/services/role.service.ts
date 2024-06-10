import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedListModel } from 'src/app/models/base-paged-list.model';
import { RoleModel, RoleSearchModel } from 'src/app/models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpClient) { }

  list(model: RoleSearchModel) {
    const api = 'Role/List';
    return this.http.post<PagedListModel<RoleModel>>(api, model, { params: { isPageType: true } });
  }

  get(id: number) {
    const api = 'Role/Get';
    return this.http.post<RoleModel>(api, null, { params: { id: id } });
  }

  create(model: RoleModel) {
    const api = 'Role/Create';
    return this.http.post<RoleModel>(api, model);
  }

  update(model: RoleModel) {
    const api = 'Role/Update';
    return this.http.post<RoleModel>(api, model);
  }

  delete(id: number) {
    const api = 'Role/Delete';
    return this.http.post<number>(api, null, { params: { id: id } });
  }
}
