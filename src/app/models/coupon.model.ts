import { BasePagedListModel } from "./base-paged-list.model";
import { BaseSearchModel } from "./base-search.model";

// This class is used for searching coupons with specific criteria.
export class CouponSearchModel extends BaseSearchModel {
    // The code of the coupon to search for.
    code: string | undefined = "";
}

// This class represents a coupon.
export class CouponModel {
  id: number | undefined=0;
  code: string | undefined;
  amount: number | undefined = 0;
  typeId: number | undefined = 0;
  typeValue: string | undefined ;
  expirationDate: string|undefined;
}

export class CouponListModel extends BasePagedListModel<CouponModel> {
}
