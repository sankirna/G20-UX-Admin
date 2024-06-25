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
import { EmailAccountListComponent } from './email-account-list/email-account-list.component';
import { EmailAccountCreateComponent } from './email-account-create/email-account-create.component';
import { EmailAccountService } from 'src/app/core/services/email-account.service';
import { EmailAccountsRoutingModule } from './email-accounts-routing.module';

@NgModule({
  declarations: [
      EmailAccountListComponent
    , EmailAccountCreateComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    EmailAccountsRoutingModule,
  ],
  providers: [
      EmailAccountService
    , RoleService
  ]
})
export class EmailAccountsModule { }
