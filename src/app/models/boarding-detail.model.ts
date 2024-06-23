import { BasePagedListModel } from "./base-paged-list.model";
import { BaseSearchModel } from "./base-search.model";

// This class is used for searching boarding details with specific criteria.
export class BoardingDetailSearchModel extends BaseSearchModel {
  // The name of the boarding detail to search for.
  name: string | undefined = "";
}

// This class represents a boarding detail.
export class BoardingDetailModel {
  id: number | undefined = 0;
  name: string | undefined;
  location: string | undefined;
  capacity: number | undefined;
  // Add other properties as needed
}

// This class represents a paginated list of boarding details.
export class BoardingDetailListModel extends BasePagedListModel<BoardingDetailModel> {
}


export class BoardingCheckRequestModel{
   productId: number | undefined = 0;
   productTicketCategoryMapId: number | undefined = 0;
   validatePayload:  string | undefined;
}