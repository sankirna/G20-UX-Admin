import { Component, Input } from '@angular/core';
import { OrderDetailModel } from 'src/app/models/order.model';

@Component({
  selector: 'app-order-information',
  templateUrl: './order-information.component.html',
  styleUrls: ['./order-information.component.css']
})
export class OrderInformationComponent {
   @Input() model: OrderDetailModel= new  OrderDetailModel();
}
