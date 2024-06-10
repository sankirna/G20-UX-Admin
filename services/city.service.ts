import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedListModel } from 'src/app/models/base-paged-list.model';
import { CityModel, CitySearchModel } from 'src/app/models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(private http: HttpClient) { }

  list(model: CitySearchModel) {
    const api = 'City/List';
    return this.http.post<PagedListModel<CityModel>>(api, model, { params: { isPageType: true } });
  }

  get(id: number) {
    const api = 'City/get';
    return this.http.post<CityModel>(api, null, { params: { id: id } });
  }

  create(model: CityModel) {
    const api = 'City/Create';
    return this.http.post<CityModel>(api, model);
  }

  update(model: CityModel) {
    const api = 'City/update';
    return this.http.post<CityModel>(api, model);
  }

  delete(id: number) {
    const api = 'City/delete';
    return this.http.post<number>(api, null, { params: { id: id } });
  }
}
