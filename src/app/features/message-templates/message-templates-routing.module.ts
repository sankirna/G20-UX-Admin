import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { MessageTemplateListComponent } from './message-template-list/message-template-list.component';
import { MessageTemplateCreateComponent } from './message-template-create/message-template-create.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      { path: 'list', component: MessageTemplateListComponent },
      { path: 'create', component: MessageTemplateCreateComponent },
      { path: 'edit/:id', component: MessageTemplateCreateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageTemplatesRoutingModule { }
