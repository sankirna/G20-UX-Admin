import { NgModule } from '@angular/core';
import {  ProductsRoutingModule } from './products-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { CountryService } from 'src/app/core/services/country.service';
import { StateService } from 'src/app/core/services/state.service';
import { CityService } from 'src/app/core/services/city.service';
import { FileService } from 'src/app/core/services/file.service';
import { ProductInformationComponent } from './shared/product-information/product-information.component';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxMatDateFormats, NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { ProductTicketCategoryListComponent } from './shared/product-ticket-category-list/product-ticket-category-list.component';
import { ProductTicketComboListComponent } from './shared/product-ticket-combo-list/product-ticket-combo-list.component';


@NgModule({
  declarations: [
      ProductListComponent
    , ProductCreateComponent
    , ProductInformationComponent
    , ProductTicketCategoryListComponent
    , ProductTicketComboListComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    SharedModule,
    ProductsRoutingModule,
  ],
  providers: [
    ProductService
  ]
})
export class ProductsModule { }
