import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedListModel } from 'src/app/models/base-paged-list.model';
import { CategoryModel, CategorySearchModel } from 'src/app/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  list(model: CategorySearchModel) {
    const api = 'Category/List';
    return this.http.post<PagedListModel<CategoryModel>>(api, model, { params: { isPageType: true } });
  }

  get(id: number) {
    const api = 'Category/Get';
    return this.http.post<CategoryModel>(api, null, { params: { id: id } });
  }

  create(model: CategoryModel) {
    const api = 'Category/Create';
    return this.http.post<CategoryModel>(api, model);
  }

  update(model: CategoryModel) {
    const api = 'Category/Update';
    return this.http.post<CategoryModel>(api, model);
  }

  delete(id: number) {
    const api = 'Category/Delete';
    return this.http.post<number>(api, null, { params: { id: id } });
  }
}
