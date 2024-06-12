import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PagedListModel } from 'src/app/models/base-paged-list.model';
import { VenueTicketCategoryMapModel } from 'src/app/models/venue-ticket-category-map.model';
import { VenueModel, VenueSearchModel } from 'src/app/models/venue.model';
import { FileService } from './file.service';
import { FileUploadRequestModel } from 'src/app/models/file.model';

@Injectable({
  providedIn: 'root'
})
export class VenueService {
  constructor(private http: HttpClient
    , private fb: FormBuilder
    , private fileService: FileService
  ) { }

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

  getVenueModelForm(model: VenueModel) {

    let form = this.fb.group({
      id: [model.id],
      stadiumName: [model.stadiumName, Validators.required],
      location: [model.location],
      capacity: [model.capacity],
      countryId: [model.countryId, Validators.required],
      venueTicketCategories: this.fb.array([])
    });
    return form;
  }

  getVenueTicketCategoryMapModelForm(model: VenueTicketCategoryMapModel): FormGroup {
    let form: FormGroup = this.fb.group({
      id: [model.id],
      userId: [model.venueId],
      ticketCategoryId: [model.ticketCategoryId],
      ticketCategoryName: [model.ticketCategoryName],
      capacity: [model.capacity],
      amount: [model.amount],
    });
    if (!model.file) {
      model.file = new FileUploadRequestModel();
    }
    form.addControl("file", this.fileService.getForm(model.file));
    return form;
  }


}
