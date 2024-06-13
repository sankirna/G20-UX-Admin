import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from 'src/app/core/services/country.service';
import { VenueService } from 'src/app/core/services/venue.service';
import { CountryModel, CountrySearchModel } from 'src/app/models/country.model';
import { VenueTicketCategoryMapModel } from 'src/app/models/venue-ticket-category-map.model';
import { VenueModel } from 'src/app/models/venue.model';
import * as _ from 'lodash';
import { TicketCategoryModel, TicketCategorySearchModel } from 'src/app/models/ticket-category.model';
import { TicketCategoryService } from 'src/app/core/services/ticket-category.service';

@Component({
  selector: 'app-venue-create',
  templateUrl: './venue-create.component.html',
  styleUrls: ['./venue-create.component.css']
})
export class VenueCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  model: VenueModel | undefined;
  countries: CountryModel[] = [];
  id: number = 0;
  isLoad:boolean=false;


  constructor(
    private router: Router
    , private route: ActivatedRoute
    , private countryService: CountryService
    , private ticketCategoryService: TicketCategoryService
    , private venueService: VenueService
    ) {
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
    this.isLoad=false;
    if (!this.model) {
      this.model = new VenueModel();
      this.model.id = 0;
    }
    this.form = this.venueService.getVenueModelForm(this.model);
    if (this.isEdit) {
      this.buildVenueTicketCategoryMapModelForm(this.model.venueTicketCategories);
    } else {
      this.loadTicketCategories();
    }
    this.isLoad=true;
  }

  buildVenueTicketCategoryMapModelForm(venueTicketCategoryMapModels: VenueTicketCategoryMapModel[]) {
    var self = this;
    _.forEach(venueTicketCategoryMapModels, function (value, key) {
      let venueTicketCategoryMapForm: FormGroup = self.venueService.getVenueTicketCategoryMapModelForm(value);
      self.venueTicketCategoriesForm.push(venueTicketCategoryMapForm);
    });
  }

  buildVenueTicketCategoryMapModelFormFromTicketCategory(ticketCategoryModels: TicketCategoryModel[]) {
    var self = this;
    _.forEach(ticketCategoryModels, function (value, key) {
      let venueTicketCategoryMapForm: FormGroup = self.venueService.getVenueTicketCategoryMapModelFormFromTicketCategory(value);
      self.venueTicketCategoriesForm.push(venueTicketCategoryMapForm);
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

  loadTicketCategories() {
    let searchModel: TicketCategorySearchModel = new TicketCategorySearchModel();
    searchModel.length = 10000;
    searchModel.start = 0;
    this.ticketCategoryService.list(searchModel).subscribe(data => {
      if (data.data) {
        this.buildVenueTicketCategoryMapModelFormFromTicketCategory(data.data);
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
