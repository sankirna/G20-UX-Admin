import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import { CountryService } from 'src/app/core/services/country.service';
import { CouponService } from 'src/app/core/services/coupon.service';
import { StateService } from 'src/app/core/services/state.service';
import { EnumModel } from 'src/app/models/common.model';
import { CountryModel, CountrySearchModel } from 'src/app/models/country.model';
import { CouponModel } from 'src/app/models/coupon.model';
import { StateModel, StateSearchModel } from 'src/app/models/state.model';

@Component({
  selector: 'app-coupon-create',
  templateUrl: './coupon-create.component.html',
  styleUrls: ['./coupon-create.component.css']
})
export class CouponCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  model: CouponModel | undefined;
  couponCalculateTypes: EnumModel[] | undefined = [];
  id: number = 0;
  submitted: boolean=false;
  constructor(
      private router: Router
    , private route: ActivatedRoute
    , private couponService: CouponService
    , private commonService: CommonService
    , private fb: FormBuilder) {
    this.getPrimaryData();
    this.buildForm();
  }

  getPrimaryData() {
    this.couponCalculateTypes = this.commonService.getPrimaryData()?.couponCalculateTypes;
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
      this.model= new CouponModel();
      this.model.id=0;
      this.model.typeId=1;
    }
    this.form = this.fb.group({
      id: [this.model.id],
      code: [this.model.code, Validators.required],
      typeId: [this.model.typeId, Validators.required],
      amount: [this.model.amount, Validators.required],
      expirationDate: [this.model.expirationDate]
    });
  }

  isValid(): boolean {
    return this.form.valid;
  }

  getData() {
    this.couponService.get(this.id).subscribe(
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
      this.model = <CouponModel>this.form.getRawValue();
      if(!this.isEdit){
        this.couponService.create(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/coupons/list');
          },
          (error) => {
            console.error(error);
          }
        );
      }else{
        this.couponService.update(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/coupons/list');
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
    this.router.navigateByUrl('/coupons/list');
  }
}
