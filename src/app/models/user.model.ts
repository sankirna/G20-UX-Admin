import { BasePagedListModel } from "./base-paged-list.model";
import { BaseSearchModel } from "./base-search.model";

// This class is used for searching coupons with specific criteria.
export class UserSearchModel extends BaseSearchModel {
  // The code of the coupon to search for.
  name: string | undefined = "";
}

// This class represents a coupon.
export class UserModel {
  id: number | undefined = 0;
  userName: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  password: string | undefined;
  roleIds: number[] = [];
}


export class UserListModel extends BasePagedListModel<UserModel> {
}
