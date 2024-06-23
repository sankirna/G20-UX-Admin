import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { BoardingDetailListComponent } from './boarding-detail-list/boarding-detail-list.component';
import { ValidateTicketComponent } from './validate-ticket/validate-ticket.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      { path: 'list', component: BoardingDetailListComponent },
      { path: 'validate-ticket', component: ValidateTicketComponent },
      // { path: 'create', component: BoardingDetailCreateComponent },
      // { path: 'edit/:id', component: BoardingDetailCreateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardingDetailsRoutingModule { }
