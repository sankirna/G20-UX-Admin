import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CountryService } from 'src/app/core/services/country.service';
import { CommonModule } from '@angular/common';
import { StateListComponent } from './state-list/state-list.component';
import { StateCreateComponent } from './state-create/state-create.component';
import { StatesRoutingModule } from './states-routing.module';
import { StateService } from 'src/app/core/services/state.service';

@NgModule({
  declarations: [
      StateListComponent
    , StateCreateComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StatesRoutingModule,
  ],
  providers: [
    CountryService
  , StateService
  ]
})
export class StatesModule { }
