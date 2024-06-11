import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenueListComponent } from './venue-list/venue-list.component';
import { VenueCreateComponent } from './venue-create/venue-create.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { VenuesRoutingModule } from './venues-routing.module';
import { VenueService } from 'src/app/core/services/venue.service';



@NgModule({
  declarations: [
    VenueListComponent,
    VenueCreateComponent,
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
    VenueService
  ]
})
export class VenuesModule { }
