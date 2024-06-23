import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoardingDetailService } from 'src/app/core/services/boarding-detail.service';
import { ProductService } from 'src/app/core/services/product.service';
import { BoardingCheckRequestModel } from 'src/app/models/boarding-detail.model';
import { EnumModel } from 'src/app/models/common.model';
import { ProductTicketCategoryMapModel } from 'src/app/models/product-ticket-category-map.model';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-validate-ticket',
  templateUrl: './validate-ticket.component.html',
  styleUrls: ['./validate-ticket.component.css']
})

export class ValidateTicketComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  model: BoardingCheckRequestModel | undefined;
  productTicketCategories: ProductTicketCategoryMapModel[] = [];
  products: ProductModel[] = [];
  constructor(
    private productService: ProductService
    , private boardingDetailService: BoardingDetailService
    , private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.getRegularProducts();
    this.buildForm();
  }

  getRegularProducts() {
    if (this.productService.regularProducts
      && this.productService.regularProducts.length <= 0
    ) {
      this.productService.getRegularProducts().subscribe(data => {
        if (data.data) {
          this.productService.regularProducts = data.data;
          this.products = data.data;
        }
      });
    }
  }

  onProductChange(productId: number): void {
    this.form.get('productId')?.reset();
    if (productId) {
      this.getTicketCategoriesByProduct(productId);
    } else {
      this.productTicketCategories = [];
    }
  }

  getTicketCategoriesByProduct(productId: number) {
    this.productService.getTicketCategoriesByProduct(productId).subscribe(data => {
      if (data) {
        this.productTicketCategories = data;
      }
    });
  }

  buildForm() {
    this.model = new BoardingCheckRequestModel();
    this.form = this.fb.group({
      id: [this.model.productId],
      productTicketCategoryMapId: [this.model.productTicketCategoryMapId, Validators.required],
      validatePayload: [this.model.validatePayload, Validators.required]
    });
  }


  isValid(): boolean {
    return this.form.valid;
  }

  onScanSuccess(validatePayload: string) {
    debugger
    this.form.get("validatePayload")?.setValue(validatePayload);
    this.oncheckValidateSubmit();
  }

  oncheckValidateSubmit() {
    if (this.isValid()) {
      this.model = <BoardingCheckRequestModel>this.form.getRawValue();
        this.boardingDetailService.validateTicket(this.model).subscribe(
          (response) => {
            alert(response);
          },
          (error) => {
            console.error(error);
          }
        );
      }
  }
}
