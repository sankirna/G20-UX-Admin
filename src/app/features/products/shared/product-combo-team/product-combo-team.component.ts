import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductModel } from 'src/app/models/product.model';
import * as _ from 'lodash';
import { ProductCombosModel } from 'src/app/models/product-combos.model';
import { ProductTicketCategoryMapModel } from 'src/app/models/product-ticket-category-map.model';

@Component({
  selector: 'app-product-combo-team',
  templateUrl: './product-combo-team.component.html',
  styleUrls: ['./product-combo-team.component.css']
})
export class ProductComboTeamComponent {
  @Input() form: FormGroup = new FormGroup({});
  @Input() forms: FormArray = this.fb.array([]);
  dataSource: MatTableDataSource<ProductModel> | undefined;
  selection = new SelectionModel<ProductModel>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns: string[] = ['select', 'Name', 'ProductType', 'VenueName', 'Team1', 'Team2', 'startDateTime'];

  constructor(
    public productService: ProductService
    , private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.productService.regularProducts);
    this.loadCheckProducts();
  }

  get productsComboData(): ProductCombosModel[] {
    return this.forms ? <ProductCombosModel[]>this.forms.getRawValue() : [];
  }

  loadCheckProducts() {
    var self = this;

    if (this.dataSource) {
      var data = this.dataSource.data;
      _.forEach(this.productsComboData, function (value, key) {
        var product = _.find(data, { 'id': value.productMapId });
        if (product) {
          self.selection.select(product);
        }
      });
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    if (this.dataSource) {
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
    return false;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.dataSource) {
      this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  selectedChange($event: any) {
    this.selection.toggle($event);
  }

  loadSelectedProduct() {
    debugger
    var self = this;
    this.forms.clear();
    var selectedProducts = this.selection.selected;
    _.forEach(selectedProducts, function (value, key) {
      if (value.id) {
        self.forms.push(self.productService.getProductsComboFormByProductId(value.id));
      }
    });

    this.loadCategoriesByProduct();
  }

  loadCategoriesByProduct() {
    let productIds: number[] = [];
    _.forEach(this.productsComboData, function (value, key) {
      if (value.productMapId) {
        productIds.push(value.productMapId);
      }
    });
    this.productService.getByProducts(productIds).subscribe(
      (response) => {
        var productTicketCategoryMapModels = this.productService.getProductTicketCategoryFromVenueTicketCategory(response);
        this.buildProductTicketComboMapModelForm(productTicketCategoryMapModels);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  buildProductTicketComboMapModelForm(productTicketCategoryMapModels: ProductTicketCategoryMapModel[]) {
    var self = this;
    var productTicketCategroiesFormArray = self.form.controls["productTicketCategories"] as FormArray;
    productTicketCategroiesFormArray.setValue([]);
    _.forEach(productTicketCategoryMapModels, function (value, key) {
      let productTicketCategoryMapForm: FormGroup = self.productService.getProductTicketCategoryMapModelForm(value);
      productTicketCategroiesFormArray.push(productTicketCategoryMapForm);
    });
  }
}
