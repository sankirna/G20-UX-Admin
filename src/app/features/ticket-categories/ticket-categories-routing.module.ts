import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { TicketCategoryListComponent } from './ticket-category-list/ticket-category-list.component';
import { TicketCategoryCreateComponent } from './ticket-category-create/ticket-category-create.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      { path: 'list', component: TicketCategoryListComponent },
      { path: 'create', component: TicketCategoryCreateComponent },
      { path: 'edit/:id', component: TicketCategoryCreateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketCategoriesRoutingModule { }
