import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedListModel } from 'src/app/models/base-paged-list.model';
import { CountryModel, CountrySearchModel } from 'src/app/models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private http: HttpClient
) { }

  list(model: CountrySearchModel){
    const api='Country/List';
    return this.http.post<PagedListModel<CountryModel>>(api, model,{params:{isPageType:true}});
  }

  get(id: number){
    const api='Country/get';
    return this.http.post<CountryModel>(api, null, {params:{id:id}});
  }

  create(model: CountryModel){
    const api='Country/Create';
    return this.http.post<CountryModel>(api, model);
  }

  update(model: CountryModel){
    const api='Country/update';
    return this.http.post<CountryModel>(api, model);
  }

  delete(id: number){
    const api='Country/delete';
    return this.http.post<number>(api, null, {params:{id:id}});
  }
}
