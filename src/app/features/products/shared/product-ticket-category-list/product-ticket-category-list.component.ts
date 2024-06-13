import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';

@Component({
  selector: 'app-product-ticket-category-list',
  templateUrl: './product-ticket-category-list.component.html',
  styleUrls: ['./product-ticket-category-list.component.css']
})
export class ProductTicketCategoryListComponent {
  @Input() forms: FormArray = this.fb.array([]);
  displayedColumns = ['TicketCategoryName','Total','Available','Block','Sold','Price'];
  dataSource: MatTableDataSource<any> | undefined;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
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
