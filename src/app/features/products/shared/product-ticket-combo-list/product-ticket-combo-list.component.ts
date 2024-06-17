import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { ProductService } from 'src/app/core/services/product.service';
import { VenueService } from 'src/app/core/services/venue.service';
import { ProductTicketCategoryMapModel } from 'src/app/models/product-ticket-category-map.model';
import { ProductModel, ProductSearchModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-ticket-combo-list',
  templateUrl: './product-ticket-combo-list.component.html',
  styleUrls: ['./product-ticket-combo-list.component.css']
})
export class ProductTicketComboListComponent {
  @Input() form: FormGroup = new FormGroup({});
  @Input() forms: FormArray = this.fb.array([]);
  displayedColumns = ['TicketCategoryName','Total','Available','Block','Sold','Price'];
  dataSource: MatTableDataSource<any> | undefined;
  products: ProductModel[] = [];  
  productIds:number[] = [];
  constructor(private fb: FormBuilder,private productService: ProductService,private venueService: VenueService) {
  }

  ngOnInit() {    
    let productSearchModel = new ProductSearchModel();
    productSearchModel.length = 10000;
    productSearchModel.start = 0;
    this.productService.list(productSearchModel).subscribe(data => {
      if (data.data) {
        this.products = data.data;
      }
    });
    this.dataSource = new MatTableDataSource(this.forms.controls);
  }

  resetForm() {
  }

  cancelEvent($event: boolean) {
    this.resetForm();
  }

  delete(index: number) {
    this.forms.removeAt(index);
    this.dataSource = new MatTableDataSource(this.forms.controls);
  }
}
