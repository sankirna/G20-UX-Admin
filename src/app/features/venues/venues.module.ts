import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenueListComponent } from './venue-list/venue-list.component';
import { VenueCreateComponent } from './venue-create/venue-create.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { VenuesRoutingModule } from './venues-routing.module';
import { VenueService } from 'src/app/core/services/venue.service';
import { FileService } from 'src/app/core/services/file.service';
import { VenueTicketCategoryListComponent } from './shared/venue-ticket-category-list/venue-ticket-category-list.component';



@NgModule({
  declarations: [
    VenueListComponent,
    VenueCreateComponent,
    VenueTicketCategoryListComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    VenuesRoutingModule
  ],
  providers: [
    VenueService,
    FileService
  ]
})
export class VenuesModule { }
