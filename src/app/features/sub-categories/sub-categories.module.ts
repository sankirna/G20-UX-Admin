import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { CategoryService } from 'src/app/core/services/category.service';
import { SubCategoryCreateComponent } from './sub-category-create/sub-category-create.component';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';
import { SubCategoryService } from 'src/app/core/services/sub-category.service';
import { SubCategoriesRoutingModule } from './sub-categories-routing.module';

@NgModule({
  declarations: [
      SubCategoryListComponent
    , SubCategoryCreateComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SubCategoriesRoutingModule,
  ],
  providers: [
    CategoryService
  , SubCategoryService
  ]
})
export class SubCategoriesModule { }
