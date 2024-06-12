import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import { CountryService } from 'src/app/core/services/country.service';
import { VenueService } from 'src/app/core/services/venue.service';
import { CountryModel, CountrySearchModel } from 'src/app/models/country.model';
import { VenueTicketCategoryMapModel } from 'src/app/models/venue-ticket-category-map.model';
import { VenueModel } from 'src/app/models/venue.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-venue-create',
  templateUrl: './venue-create.component.html',
  styleUrls: ['./venue-create.component.css']
})
export class VenueCreateComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  model: VenueModel | undefined;
  countries: CountryModel[] = [];
  id: number = 0;


  constructor(
    private router: Router
    , private route: ActivatedRoute
    , private countryService: CountryService
    , private venueService: VenueService
    , private commonService: CommonService
    , private fb: FormBuilder) {
    
    this.buildForm();
  }

  get isEdit(): boolean {
    return (this.id && this.id > 0 ? true : false);
  }

  get venueTicketCategoriesForm() {
    return this.form.get("venueTicketCategories") as FormArray;
  }

  ngOnInit() {
    this.loadContries();
    this.id = <number><unknown>this.route.snapshot.paramMap.get('id');
    if (this.isEdit) {
      this.getData();
    } else {
      this.buildForm();
    }
  }


  buildForm() {
    if (!this.model) {
      this.model = new VenueModel();
      this.model.id = 0;
    }
    // this.form = this.fb.group({
    //   id: [this.model.id],
    //   stadiumName: [this.model.stadiumName, Validators.required],
    //   location: [this.model.location],
    //   capacity: [this.model.capacity],
    //   countryId: [this.model.countryId, Validators.required],
    // });
    this.form= this.venueService.getVenueModelForm(this.model);
    if(this.isEdit){
      this.buildVenueTicketCategoryMapModelForm(this.model.venueTicketCategories);
    }
  }

  buildVenueTicketCategoryMapModelForm(venueTicketCategoryMapModels: VenueTicketCategoryMapModel[]) {
    var self = this;
    _.forEach(venueTicketCategoryMapModels, function (value, key) {
      let addressForm: FormGroup = self.venueService.getVenueTicketCategoryMapModelForm(value);
      self.venueTicketCategoriesForm.push(addressForm);
    });
  }

  loadContries() {
    let countrySearchModel = new CountrySearchModel();
    countrySearchModel.length = 10000;
    countrySearchModel.start = 0;
    this.countryService.list(countrySearchModel).subscribe(data => {
      if (data.data) {
        this.countries = data.data;
      }
    });
  }

  isValid(): boolean {
    return this.form.valid;
  }

  getData() {
    this.venueService.get(this.id).subscribe(
      (response) => {
        this.model = response;
        this.buildForm();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit() {
    
    if (this.isValid()) {
      this.model = <VenueModel>this.form.getRawValue();
      if (!this.isEdit) {
        this.venueService.create(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/venues/list');
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        this.venueService.update(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/venues/list');
          },
          (error) => {
            console.error(error);
          }
        );
      }

    }
  }

  onClear() {

  }
  gotoList() {
    this.router.navigateByUrl('/venues/list');
  }
}
