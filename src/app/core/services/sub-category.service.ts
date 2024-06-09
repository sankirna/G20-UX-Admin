import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedListModel } from 'src/app/models/base-paged-list.model';
import { CategorySearchModel } from 'src/app/models/category.model';
import { SubCategoryModel } from 'src/app/models/sub-category.model';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  constructor(private http: HttpClient) { }

  list(model: CategorySearchModel) {
    const api = 'SubCategory/List';
    return this.http.post<PagedListModel<SubCategoryModel>>(api, model, { params: { isPageType: true } });
  }

  get(id: number) {
    const api = 'SubCategory/Get';
    return this.http.post<SubCategoryModel>(api, null, { params: { id: id } });
  }

  create(model: SubCategoryModel) {
    const api = 'SubCategory/Create';
    return this.http.post<SubCategoryModel>(api, model);
  }

  update(model: SubCategoryModel) {
    const api = 'SubCategory/Update';
    return this.http.post<SubCategoryModel>(api, model);
  }

  delete(id: number) {
    const api = 'SubCategory/Delete';
    return this.http.post<number>(api, null, { params: { id: id } });
  }
}
