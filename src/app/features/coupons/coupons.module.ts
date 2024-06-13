import { NgModule } from '@angular/core';
import {  CouponsRoutingModule } from './coupons-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CouponListComponent } from './coupon-list/coupon-list.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { CouponService } from 'src/app/core/services/coupon.service';
import { CouponCreateComponent } from './coupon-create/coupon-create.component';

@NgModule({
  declarations: [
      CouponListComponent
    , CouponCreateComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CouponsRoutingModule,
  ],
  providers: [
    CouponService
  ]
})
export class CouponsModule { }
