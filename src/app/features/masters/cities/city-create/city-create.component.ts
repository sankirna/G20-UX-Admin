import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from 'src/app/core/services/city.service';
import { CountryService } from 'src/app/core/services/country.service';
import { StateService } from 'src/app/core/services/state.service';
import { CityModel } from 'src/app/models/city.model';
import { CountryModel, CountrySearchModel } from 'src/app/models/country.model';
import { StateModel, StateSearchModel } from 'src/app/models/state.model';

@Component({
  selector: 'app-city-create',
  templateUrl: './city-create.component.html',
  styleUrls: ['./city-create.component.css']
})
export class CityCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  model: CityModel | undefined;
  countries: CountryModel[] = [];
  states: StateModel[] = [];
  id: number = 0;

  constructor(
      private router: Router
    , private route: ActivatedRoute
    , private countryService: CountryService
    , private stateService: StateService
    , private cityService: CityService
    , private fb: FormBuilder) {
    this.buildForm();
  }

  get isEdit(): boolean {
    return (this.id && this.id > 0 ? true : false);
  }

  ngOnInit() {
    this.loadContries();
    this.id = <number><unknown>this.route.snapshot.paramMap.get('id');
    if (this.isEdit) {
      this.getData();
    }else{
      this.buildForm();
    }
  }

  onCountryChange(countryId: number): void {
    this.form.get('stateId')?.reset();
    if (countryId) {
      this.loadStates(countryId);
    } else {
      this.states = [];
    }
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

  loadStates(countryId: number) {
    let stateSearchModel = new StateSearchModel();
    stateSearchModel.length = 10000;
    stateSearchModel.start = 0;
    stateSearchModel.countryId = countryId;
    this.stateService.list(stateSearchModel).subscribe(data => {
      if (data.data) {
        this.states = data.data;
      }
    });
  }

  buildForm() {
    if (!this.model) {
      this.model= new CityModel();
      this.model.id=0;
    }
    this.form = this.fb.group({
      id: [this.model.id],
      name: [this.model.name, Validators.required],
      countryId: [this.model.countryId, Validators.required],
      stateId: [this.model.stateId, Validators.required]
    });
  }

  isValid(): boolean {
    return this.form.valid;
  }

  getData() {
    this.cityService.get(this.id).subscribe(
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
      this.model = <CityModel>this.form.getRawValue();
      if(!this.isEdit){
        this.cityService.create(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/cities/list');
          },
          (error) => {
            console.error(error);
          }
        );
      }else{
        this.cityService.update(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/cities/list');
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
  gotoList(){
    this.router.navigateByUrl('/cities/list');
  }
}
