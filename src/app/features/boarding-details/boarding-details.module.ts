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
import { RoleService } from 'src/app/core/services/role.service';
import { BoardingDetailListComponent } from './boarding-detail-list/boarding-detail-list.component';
import { BoardingDetailService } from 'src/app/core/services/boarding-detail.service';
import { BoardingDetailsRoutingModule } from './boarding-details-routing.module';
import { ValidateTicketComponent } from './validate-ticket/validate-ticket.component';

@NgModule({
  declarations: [
      BoardingDetailListComponent,
      ValidateTicketComponent
    // , BoardingDetailCreateComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BoardingDetailsRoutingModule,
  ],
  providers: [
      BoardingDetailService
    , RoleService
  ]
})
export class BoardingDetailsModule { }
