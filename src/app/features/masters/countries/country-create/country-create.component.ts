import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from 'src/app/core/services/country.service';
import { CountryModel } from 'src/app/models/country.model';

@Component({
  selector: 'app-country-create',
  templateUrl: './country-create.component.html',
  styleUrls: ['./country-create.component.css']
})
export class CountryCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  model: CountryModel | undefined;
  id: number = 0;
  submitted=false;
  constructor(
      private router: Router
    , private route: ActivatedRoute
    , private countryService: CountryService
    , private fb: FormBuilder) {
    this.buildForm();
  }

  get isEdit(): boolean {
    return (this.id && this.id > 0 ? true : false);
  }

  ngOnInit() {
    this.id = <number><unknown>this.route.snapshot.paramMap.get('id');
    if (this.isEdit) {
      this.getData();
    }else{
      this.buildForm();
    }
  }

  buildForm() {
    if (!this.model) {
      this.model= new CountryModel();
      this.model.id=0;
    }
    this.form = this.fb.group({
      id: [this.model.id],
      name: [this.model.name, Validators.required]
    });
  }

  isValid(): boolean {
    return this.form.valid;
  }

  getData() {
    this.countryService.get(this.id).subscribe(
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
    this.submitted=true;
    if (this.isValid()) {
      this.model = <CountryModel>this.form.getRawValue();
      if(!this.isEdit){
        this.countryService.create(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/countries/list');
          },
          (error) => {
            console.error(error);
          }
        );
      }else{
        this.countryService.update(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/countries/list');
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
    this.router.navigateByUrl('/countries/list');
  }
}
