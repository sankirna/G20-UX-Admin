import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from 'src/app/core/services/city.service';
import { CommonService } from 'src/app/core/services/common.service';
import { CountryService } from 'src/app/core/services/country.service';
import { FileService } from 'src/app/core/services/file.service';
import { StateService } from 'src/app/core/services/state.service';
import { ProductService } from 'src/app/core/services/product.service';
import { CityModel, CitySearchModel } from 'src/app/models/city.model';
import { EnumModel } from 'src/app/models/common.model';
import { CountryModel, CountrySearchModel } from 'src/app/models/country.model';
import { FileUploadRequestModel } from 'src/app/models/file.model';
import { StateModel, StateSearchModel } from 'src/app/models/state.model';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  model: ProductModel | undefined;
  countries: CountryModel[] = [];
  states: StateModel[] = [];
  cities: CityModel[] = [];
  files: File[] = []
  id: number = 0;

  constructor(
      private router: Router
    , private route: ActivatedRoute
    , private productService: ProductService
    , public fileService: FileService
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

  get fileDataForm() {
    return this.form.get("file") as FormGroup;
  }
  
  buildForm() {
    if (!this.model) {
      this.model= new ProductModel();
      this.model.id=0;
      this.model.productTypeId=0;
    }
    this.form = this.productService.getProductInformationForm(this.model);
  }

  isValid(): boolean {
    debugger
    return this.form.valid;
  }

  uploadFile(event: FileUploadRequestModel){
    this.fileDataForm.controls["fileName"].setValue(event.fileName);
    this.fileDataForm.controls["fileAsBase64"].setValue(event.fileAsBase64);
    this.fileDataForm.controls["id"].setValue(0);
  }

  removeFile(event: FileUploadRequestModel){
    this.fileDataForm.controls["fileName"].setValue("");
    this.fileDataForm.controls["fileAsBase64"].setValue("");
    this.fileDataForm.controls["id"].setValue(0);
  }

  getData() {
    this.productService.get(this.id).subscribe(
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
      this.model = <ProductModel>this.form.getRawValue();
      if(!this.isEdit){
        this.productService.create(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/products/list');
          },
          (error) => {
            console.error(error);
          }
        );
      }else{
        this.productService.update(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/products/list');
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
    this.router.navigateByUrl('/products/list');
  }
}
