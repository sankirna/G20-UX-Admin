import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category.service';
import { CommonService } from 'src/app/core/services/common.service';
import { SubCategoryService } from 'src/app/core/services/sub-category.service';
import { CategoryModel, CategorySearchModel } from 'src/app/models/category.model';
import { SubCategoryModel } from 'src/app/models/sub-category.model';

@Component({
  selector: 'app-sub-category-create',
  templateUrl: './sub-category-create.component.html',
  styleUrls: ['./sub-category-create.component.css']
})
export class SubCategoryCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  model: SubCategoryModel | undefined;
  categories: CategoryModel[] = [];
  id: number = 0;


  constructor(
    private router: Router
    , private route: ActivatedRoute
    , private categoryService: CategoryService
    , private subCategoryService: SubCategoryService
    , private commonService: CommonService
    , private fb: FormBuilder) {
    
    this.buildForm();
  }

  get isEdit(): boolean {
    return (this.id && this.id > 0 ? true : false);
  }

  ngOnInit() {
    this.loadContries();
    this.id = <number><unknown>this.route.snapshot.paramMap.get('id');
    if (this.isEdit) {
      this.getData();
    } else {
      this.buildForm();
    }
  }


  buildForm() {
    if (!this.model) {
      this.model = new SubCategoryModel();
      this.model.id = 0;
    }
    this.form = this.fb.group({
      id: [this.model.id],
      name: [this.model.name, Validators.required],
      description: [this.model.description],
      categoryId: [this.model.categoryId, Validators.required],
    });
  }

  loadContries() {
    let categorySearchModel = new CategorySearchModel();
    categorySearchModel.length = 10000;
    categorySearchModel.start = 0;
    this.categoryService.list(categorySearchModel).subscribe(data => {
      if (data.data) {
        this.categories = data.data;
      }
    });
  }

  isValid(): boolean {
    return this.form.valid;
  }

  getData() {
    this.subCategoryService.get(this.id).subscribe(
      (response) => {
        this.model = response;
        this.buildForm();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit() {
    
    if (this.isValid()) {
      this.model = <SubCategoryModel>this.form.getRawValue();
      if (!this.isEdit) {
        this.subCategoryService.create(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/subcategories/list');
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        this.subCategoryService.update(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/subcategories/list');
          },
          (error) => {
            console.error(error);
          }
        );
      }

    }
  }

  onClear() {

  }
  gotoList() {
    this.router.navigateByUrl('/subcategories/list');
  }
}
