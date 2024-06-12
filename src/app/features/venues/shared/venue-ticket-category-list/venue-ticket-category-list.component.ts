import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-venue-ticket-category-list',
  templateUrl: './venue-ticket-category-list.component.html',
  styleUrls: ['./venue-ticket-category-list.component.css']
})
export class VenueTicketCategoryListComponent {
  @Input() forms: FormArray = this.fb.array([]);
  displayedColumns = ['TicketCategoryName', 'Capacity', 'Amount']

  constructor(private fb: FormBuilder) 
  {
  }


  resetForm() {

  }
  cancelEvent($event: boolean) {
    this.resetForm();
  }

}
