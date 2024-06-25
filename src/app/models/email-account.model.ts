import { BasePagedListModel } from "./base-paged-list.model";
import { BaseSearchModel } from "./base-search.model";

// This class is used for searching coupons with specific criteria.
export class EmailAccountSearchModel extends BaseSearchModel {
  // The email of the account to search for.
  email: string | undefined = "";
}

// This class represents a coupon.
export class EmailAccountModel {
  id: number | undefined = 0;
  email: string | undefined;
  displayName: string | undefined;
  host: string | undefined;
  port: number | undefined = 0;
  username: string | undefined;
  password: string | undefined;
  enableSsl: boolean | undefined = false;
  maxNumberOfEmails: number | undefined = 0;
  emailAuthenticationMethodId: number | undefined = 0;
  clientId: string | undefined;
  clientSecret: string | undefined;
  tenantId: string | undefined;

}


export class EmailAccountListModel extends BasePagedListModel<EmailAccountModel> {
}
