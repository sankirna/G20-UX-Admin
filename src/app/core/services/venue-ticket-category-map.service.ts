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
export class VenueTicketCategoryMapService {
  constructor(private fb: FormBuilder
    , private fileService: FileService
  ) {

  }

  


}
