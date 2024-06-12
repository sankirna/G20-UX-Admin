import { BasePagedListModel } from "./base-paged-list.model";
import { BaseSearchModel } from "./base-search.model";
import { FileUploadRequestModel } from "./file.model";

// This class is used for searching ticket categories with specific criteria.
export class TicketCategorySearchModel extends BaseSearchModel {
  name: string | undefined = "";
}

// This class represents a ticket category.
export class TicketCategoryModel {
  id: number | undefined = 0;
  name: string | undefined;
  description: string | undefined;
  file: FileUploadRequestModel | undefined;
}

// This class represents a paginated list of ticket categories.
export class TicketCategoryListModel extends BasePagedListModel<TicketCategoryModel> {
}
