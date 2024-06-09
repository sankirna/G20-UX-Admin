import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryCreateComponent } from './country-create/country-create.component';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'list', component: CountryListComponent },
      { path: 'create', component: CountryCreateComponent },
      { path: 'edit/:id', component: CountryCreateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }
