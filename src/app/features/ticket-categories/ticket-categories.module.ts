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
import { CommonModule } from '@angular/common';
import { CountryService } from 'src/app/core/services/country.service';
import { StateService } from 'src/app/core/services/state.service';
import { CityService } from 'src/app/core/services/city.service';
import { FileService } from 'src/app/core/services/file.service';
import { TicketCategoryListComponent } from './ticket-category-list/ticket-category-list.component';
import { TicketCategoryCreateComponent } from './ticket-category-create/ticket-category-create.component';
import { TicketCategoryService } from 'src/app/core/services/ticket-category.service';
import { TicketCategoriesRoutingModule } from './ticket-categories-routing.module';


@NgModule({
  declarations: [
      TicketCategoryListComponent
    , TicketCategoryCreateComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TicketCategoriesRoutingModule,
  ],
  providers: [
    TicketCategoryService,
    CountryService,
    StateService,
    CityService,
    FileService
  ]
})
export class TicketCategoriesModule { }
