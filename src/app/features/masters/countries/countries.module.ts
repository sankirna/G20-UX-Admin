import { NgModule } from '@angular/core';
import { CountriesRoutingModule } from './countries-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryCreateComponent } from './country-create/country-create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CountryService } from 'src/app/core/services/country.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
      CountryListComponent
    , CountryCreateComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CountriesRoutingModule,
  ],
  providers: [
    CountryService
  ]
})
export class CountriesModule { }
