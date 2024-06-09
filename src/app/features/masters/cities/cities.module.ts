import { NgModule } from '@angular/core';
import { CitiesRoutingModule } from './cities-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CityListComponent } from './city-list/city-list.component';
import { CityCreateComponent } from './city-create/city-create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityService } from 'src/app/core/services/city.service';
import { CommonModule } from '@angular/common';
import { StateService } from 'src/app/core/services/state.service';
import { CountryService } from 'src/app/core/services/country.service';

@NgModule({
  declarations: [
      CityListComponent
    , CityCreateComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CitiesRoutingModule,
  ],
  providers: [
    CountryService
  , StateService
  , CityService
  ]
})
export class CitiesModule { }
