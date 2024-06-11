import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedListModel } from 'src/app/models/base-paged-list.model';
import { VenueModel, VenueSearchModel } from 'src/app/models/venue.model';

@Injectable({
  providedIn: 'root'
})
export class VenueService {
  constructor(private http: HttpClient) { }

  list(model: VenueSearchModel) {
    const api = 'Venue/List';
    return this.http.post<PagedListModel<VenueModel>>(api, model, { params: { isPageType: true } });
  }

  get(id: number) {
    const api = 'Venue/Get';
    return this.http.post<VenueModel>(api, null, { params: { id: id } });
  }

  create(model: VenueModel) {
    const api = 'Venue/Create';
    return this.http.post<VenueModel>(api, model);
  }

  update(model: VenueModel) {
    const api = 'Venue/Update';
    return this.http.post<VenueModel>(api, model);
  }

  delete(id: number) {
    const api = 'Venue/Delete';
    return this.http.post<number>(api, null, { params: { id: id } });
  }
}
