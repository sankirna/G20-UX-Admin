import { BasePagedListModel } from "./base-paged-list.model";
import { BaseSearchModel } from "./base-search.model";
import { UserModel } from "./user.model";

// This class is used for searching orders with specific criteria.
export class OrderSearchModel extends BaseSearchModel {
  // The ID of the order to search for.
  orderId: number | undefined;
  // The name of the user associated with the order to search for.
  userName: string | undefined = "";
  // The status of the order to search for.
  status: string | undefined = "";
}

// This class represents an order.
export class OrderModel {
  orderId: number | undefined = 0;
  userId: number | undefined;
  productIds: number[] = [];
  totalAmount: number | undefined = 0.0;
  orderDate: Date | undefined;
  status: string | undefined;
}

export class OrderDetailModel{
  id: number | undefined;
  userId: number | undefined;
  userName: string | undefined;
  couponCode: string | undefined;
  couponId: number | undefined;
  grossTotal: number | undefined;
  discount: number | undefined;
  grandTotal: number | undefined;
  email: string | undefined;
  name: string | undefined;
  phoneNumber: string | undefined;
  orderStatusId: number | undefined;
  orderStatus: string | undefined;
  createdDateTime: string | undefined;
  updatedDateTime: string | undefined;
  userDetail: UserModel| undefined;
}


export class OrderListRequestModel extends BaseSearchModel{
  userId: number | undefined;
  orderStatusId: number | undefined;
  fromDate: string | undefined;
  toDate: string | undefined;
}

// This class represents a paginated list of orders.
export class OrderListModel extends BasePagedListModel<OrderDetailModel> {
}


