import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { PagedListModel } from 'src/app/models/base-paged-list.model';
import { FileUploadRequestModel } from 'src/app/models/file.model';
import { ProductModel, ProductSearchModel } from 'src/app/models/product.model';
import { FileService } from './file.service';
import { ProductTicketCategoriesRequestModel, ProductTicketCategoryMapModel } from 'src/app/models/product-ticket-category-map.model';
import { VenueService } from './venue.service';
import { VenueTicketCategoryMapModel } from 'src/app/models/venue-ticket-category-map.model';
import * as _ from 'lodash';
import { ProductCombosModel } from 'src/app/models/product-combos.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  regularProducts: ProductModel[] = [];

  constructor(private http: HttpClient
    , private fb: FormBuilder
    , private fileService: FileService
    , private venueService: VenueService
  ) { }

  list(model: ProductSearchModel) {
    const api = 'Product/List';
    return this.http.post<PagedListModel<ProductModel>>(api, model, { params: { isPageType: true } });
  }

  get(id: number) {
    const api = 'Product/Get';
    return this.http.post<ProductModel>(api, null, { params: { id: id } });
  }

  create(model: ProductModel) {
    const api = 'Product/Create';
    return this.http.post<ProductModel>(api, model);
  }

  update(model: ProductModel) {
    const api = 'Product/Update';
    return this.http.post<ProductModel>(api, model);
  }

  delete(id: number) {
    const api = 'Product/Delete';
    return this.http.post<number>(api, null, { params: { id: id } });
  }

  getRegularProducts() {
    let model: ProductSearchModel = new ProductSearchModel();
    model.length = 10000;
    model.start = 0;
    model.productTypeId = 0;
    return this.list(model);
  }


  isReguler(form: FormGroup): boolean {
    let regular = false;
    if (form.get("productTypeId")
      && form.get("productTypeId")?.getRawValue() == 0) {
      regular = true;
    }
    return regular;
  }

  isCombo(form: FormGroup): boolean {
    let combo = false;
    if (form.get("productTypeId")
      && form.get("productTypeId")?.getRawValue() == 1) {
      combo = true;
    }
    return combo;
  }

  getProductInformationForm(model: ProductModel): FormGroup {
    let form: FormGroup = this.fb.group({
      id: [model.id],
      name: [model.name],
      categoryId: [model.categoryId],
      productTypeId: [model.productTypeId, Validators.required],
      venueId: [model.venueId],
      team1Id: [model.team1Id],
      team2Id: [model.team2Id],
      startDateTime: [model.startDateTime],
      endDateTime: [model.endDateTime],
      scheduleDateTime: [model.scheduleDateTime],
      description: [model.description],
      fileId: [model.fileId],
      productTicketCategories: this.fb.array([]),
      productCombos: this.fb.array([])
    }, { validator: dateTimeRangeValidator('startDateTime', 'endDateTime') });
    if (!model.file) {
      model.file = new FileUploadRequestModel();
    }
    form.addControl("file", this.fileService.getForm(model.file));
    return form;
  }

  getProductTicketCategoryMapModelForm(model: ProductTicketCategoryMapModel): FormGroup {
    let form: FormGroup = this.fb.group({
      id: [model.id],
      productId: [model.productId],
      ticketCategoryId: [model.ticketCategoryId],
      ticketCategoryName: [model.ticketCategoryName],
      total: [model.total],
      available: [model.available],
      block: [model.block],
      sold: [model.sold],
      price: [model.price],
    });
    if (!model.file) {
      model.file = new FileUploadRequestModel();
    }
    form.addControl("file", this.fileService.getForm(model.file));
    return form;
  }

  getProductTicketCategoryFromVenueTicketCategory(venueTicketCategories: VenueTicketCategoryMapModel[]) {
    let productTicketCategories: ProductTicketCategoryMapModel[] = [];
    _.forEach(venueTicketCategories, function (value, key) {
      let model: ProductTicketCategoryMapModel = new ProductTicketCategoryMapModel();
      model.ticketCategoryId = value.ticketCategoryId;
      model.ticketCategoryName = value.ticketCategoryName;
      model.file = value.file;
      productTicketCategories.push(model);
      // let productTicketCategoryMapForm: FormGroup = self.productService.getProductTicketCategoryMapModelForm(value);
      // productTicketCategroiesFormArray.push(productTicketCategoryMapForm);
    });
    return productTicketCategories;
    // let ProductTicketCategoryMapModel: ProductTicketCategoryMapModel= new ProductTicketCategoryMapModel();
  }

  getProductsComboForm(model: ProductCombosModel) {
    let form: FormGroup = this.fb.group({
      id: [model.id],
      productId: [model.productId],
      productMapId: [model.productMapId],
    });
    return form;
  }

  getProductsComboFormByProductId(productId: number) {
    let model: ProductCombosModel= new ProductCombosModel();
    model.id=0;
    model.productMapId=productId;
    return this.getProductsComboForm(model);
  }

  getByProducts(model: ProductTicketCategoriesRequestModel) {
    const api = 'Product/GetTicketCategoriesByProducts';
    return this.http.post<any>(api,  model);
  }


}
export function dateTimeRangeValidator(startControlName: string, endControlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const formGroup = control as FormGroup;
    const startControl = formGroup.controls[startControlName];
    const endControl = formGroup.controls[endControlName];

    if (startControl && endControl) {
      const startDateTime = new Date(startControl.value);
      const endDateTime = new Date(endControl.value);

      if (endDateTime < startDateTime) {
        endControl.setErrors({ dateTimeRange: true });
        return { dateTimeRange: true };
      } else {
        if (endControl.errors && endControl.errors['dateTimeRange']) {
          delete endControl.errors['dateTimeRange'];
          if (!Object.keys(endControl.errors).length) {
            endControl.setErrors(null);
          }
        }
      }
    }
    return null;
  };
}
