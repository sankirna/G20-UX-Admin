import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { RoleService } from 'src/app/core/services/role.service';
import { MessageTemplateListComponent } from './message-template-list/message-template-list.component';
import { MessageTemplateCreateComponent } from './message-template-create/message-template-create.component';
import { MessageTemplateService } from 'src/app/core/services/message-template.service';
import { MessageTemplatesRoutingModule } from './message-templates-routing.module';
import { NgxEditorModule } from 'ngx-editor';

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
    NgxEditorModule

  ],
  providers: [
      MessageTemplateService
    , RoleService
  ]
})
export class MessageTemplatesModule { }
