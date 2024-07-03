import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OrderProductItemModel } from 'src/app/models/order.model';

@Component({
  selector: 'app-order-product-items',
  templateUrl: './order-product-items.component.html',
  styleUrls: ['./order-product-items.component.css']
})
export class OrderProductItemsComponent {
  @Input() orderProductItems : OrderProductItemModel[]|undefined=[];
  dataSource: MatTableDataSource<OrderProductItemModel> | undefined;
  displayedColumns: string[] = ['Date','Name','Category','Venue','Team1','Team2'];

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.orderProductItems);
  }
}
