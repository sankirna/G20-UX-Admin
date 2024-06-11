import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { VenueListComponent } from './venue-list/venue-list.component';
import { VenueCreateComponent } from './venue-create/venue-create.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      { path: 'list', component: VenueListComponent },
      { path: 'create', component: VenueCreateComponent },
      { path: 'edit/:id', component: VenueCreateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VenuesRoutingModule { }
