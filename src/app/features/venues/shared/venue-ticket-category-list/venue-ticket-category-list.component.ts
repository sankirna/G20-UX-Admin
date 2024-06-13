import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';

@Component({
  selector: 'app-venue-ticket-category-list',
  templateUrl: './venue-ticket-category-list.component.html',
  styleUrls: ['./venue-ticket-category-list.component.css']
})
export class VenueTicketCategoryListComponent {
  @Input() forms: FormArray = this.fb.array([]);
  displayedColumns = ['TicketCategoryName', "Actions"];
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
