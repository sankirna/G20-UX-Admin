import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityListComponent } from './city-list/city-list.component';
import { CityCreateComponent } from './city-create/city-create.component';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'list', component: CityListComponent },
      { path: 'create', component: CityCreateComponent },
      { path: 'edit/:id', component: CityCreateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesRoutingModule { }
