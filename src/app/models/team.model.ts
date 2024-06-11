import { BasePagedListModel } from "./base-paged-list.model";
import { BaseSearchModel } from "./base-search.model";
import { FileUploadRequestModel } from "./file.model";

// This class is used for searching coupons with specific criteria.
export class TeamSearchModel extends BaseSearchModel {
  // The name of the team to search for.
  name: string | undefined = "";
}

// This class represents a coupon.
export class TeamModel {
  id: number | undefined = 0;
  name: string | undefined;
  shortName: string | undefined;
  countryId: number | undefined = 0;
  stateId: number | undefined = 0;
  cityId: number | undefined = 0;
  logo: FileUploadRequestModel | undefined;
}

export class TeamListModel extends BasePagedListModel<TeamModel> {
}
