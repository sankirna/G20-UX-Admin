import { NgModule } from '@angular/core';
import { CategoriesRoutingModule } from './categories-routing.module';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { CategoryService } from 'src/app/core/services/category.service';
import { SubCategoryService } from 'src/app/core/services/sub-category.service';

@NgModule({
  declarations: [
    CategoryListComponent
    , CategoryCreateComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CategoriesRoutingModule,
  ],
  providers: [
    CategoryService,
    SubCategoryService
  ]
})
export class CategoriesModule { }
