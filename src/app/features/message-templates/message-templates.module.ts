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
import { MessageTemplateListComponent } from './message-template-list/message-template-list.component';
import { MessageTemplateCreateComponent } from './message-template-create/message-template-create.component';
import { MessageTemplateService } from 'src/app/core/services/message-template.service';
import { MessageTemplatesRoutingModule } from './message-templates-routing.module';

@NgModule({
  declarations: [
      MessageTemplateListComponent
    , MessageTemplateCreateComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MessageTemplatesRoutingModule,
  ],
  providers: [
      MessageTemplateService
    , RoleService
  ]
})
export class MessageTemplatesModule { }
