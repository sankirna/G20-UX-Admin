import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from 'src/app/core/services/country.service';
import { StateService } from 'src/app/core/services/state.service';
import { CountryModel, CountrySearchModel } from 'src/app/models/country.model';
import { StateModel } from 'src/app/models/state.model';

@Component({
  selector: 'app-state-create',
  templateUrl: './state-create.component.html',
  styleUrls: ['./state-create.component.css']
})
export class StateCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  model: StateModel | undefined;
  countries: CountryModel[] = [];  id: number = 0;

  constructor(
      private router: Router
    , private route: ActivatedRoute
    , private countryService: CountryService
    , private stateService: StateService
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

  buildForm() {
    if (!this.model) {
      this.model= new StateModel();
      this.model.id=0;
    }
    this.form = this.fb.group({
      id: [this.model.id],
      name: [this.model.name, Validators.required],
      countryId: [this.model.countryId, Validators.required]
    });
  }

  isValid(): boolean {
    return this.form.valid;
  }

  getData() {
    this.stateService.get(this.id).subscribe(
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
      this.model = <StateModel>this.form.getRawValue();
      if(!this.isEdit){
        this.stateService.create(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/states/list');
          },
          (error) => {
            console.error(error);
          }
        );
      }else{
        this.stateService.update(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/states/list');
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
    this.router.navigateByUrl('/states/list');
  }
}
