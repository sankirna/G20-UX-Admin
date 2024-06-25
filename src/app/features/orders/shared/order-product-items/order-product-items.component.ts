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
  displayedColumns: string[] = ['Name'];

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.orderProductItems);
  }
}
