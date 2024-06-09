import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { SubCategoryCreateComponent } from './sub-category-create/sub-category-create.component';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      { path: 'list', component: SubCategoryListComponent },
      { path: 'create', component: SubCategoryCreateComponent },
      { path: 'edit/:id', component: SubCategoryCreateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCategoriesRoutingModule { }
