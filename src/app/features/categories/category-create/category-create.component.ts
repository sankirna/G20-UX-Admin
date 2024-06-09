import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category.service';
import { CommonService } from 'src/app/core/services/common.service';
import { CategoryModel } from 'src/app/models/category.model';
import { EnumModel } from 'src/app/models/common.model';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  model: CategoryModel | undefined;
  categoryCalculateTypes: EnumModel[] | undefined = [];
  id: number = 0;

  constructor(
      private router: Router
    , private route: ActivatedRoute
    , private categoryService: CategoryService
    , private commonService: CommonService
    , private fb: FormBuilder) {
    this.buildForm();
  }

  get isEdit(): boolean {
    return (this.id && this.id > 0 ? true : false);
  }

  ngOnInit() {
    this.id = <number><unknown>this.route.snapshot.paramMap.get('id');
    if (this.isEdit) {
      this.getData();
    }else{
      this.buildForm();
    }
  }

  
  buildForm() {
    if (!this.model) {
      this.model= new CategoryModel();
      this.model.id=0;
    }
    this.form = this.fb.group({
      id: [this.model.id],
      name: [this.model.name, Validators.required],
      description: [this.model.description],
    });
  }

  isValid(): boolean {
    return this.form.valid;
  }

  getData() {
    this.categoryService.get(this.id).subscribe(
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
    debugger
    if (this.isValid()) {
      this.model = <CategoryModel>this.form.getRawValue();
      if(!this.isEdit){
        this.categoryService.create(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/categories/list');
          },
          (error) => {
            console.error(error);
          }
        );
      }else{
        this.categoryService.update(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/categories/list');
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
  gotoList(){
    this.router.navigateByUrl('/categories/list');
  }
}
