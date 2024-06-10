import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedListModel } from 'src/app/models/base-paged-list.model';
import { UserModel, UserSearchModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  list(model: UserSearchModel) {
    const api = 'User/List';
    return this.http.post<PagedListModel<UserModel>>(api, model, { params: { isPageType: true } });
  }

  get(id: number) {
    const api = 'User/Get';
    return this.http.post<UserModel>(api, null, { params: { id: id } });
  }

  create(model: UserModel) {
    const api = 'User/Create';
    return this.http.post<UserModel>(api, model);
  }

  update(model: UserModel) {
    const api = 'User/Update';
    return this.http.post<UserModel>(api, model);
  }

  delete(id: number) {
    const api = 'User/Delete';
    return this.http.post<number>(api, null, { params: { id: id } });
  }
}
