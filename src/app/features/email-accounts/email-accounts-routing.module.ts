import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { EmailAccountListComponent } from './email-account-list/email-account-list.component';
import { EmailAccountCreateComponent } from './email-account-create/email-account-create.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      { path: 'list', component: EmailAccountListComponent },
      { path: 'create', component: EmailAccountCreateComponent },
      { path: 'edit/:id', component: EmailAccountCreateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailAccountsRoutingModule { }
