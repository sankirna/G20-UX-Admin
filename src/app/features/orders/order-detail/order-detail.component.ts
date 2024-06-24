import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import { OrderService } from 'src/app/core/services/order.service';
import { OrderDetailModel } from 'src/app/models/order.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {
   id: number = 0;
   model: OrderDetailModel= new  OrderDetailModel();

   constructor(private orderService: OrderService
    , private commonService: CommonService
     , private router: Router
     , private route: ActivatedRoute
     , private dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.id = <number><unknown>this.route.snapshot.paramMap.get('id');
    this.getData();
  }

  getData() {
    this.orderService.get(this.id).subscribe(
      (response) => {
        this.model = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
