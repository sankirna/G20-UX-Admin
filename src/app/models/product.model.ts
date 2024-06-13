import { BasePagedListModel } from "./base-paged-list.model";
import { BaseSearchModel } from "./base-search.model";
import { FileUploadRequestModel } from "./file.model";

// This class is used for searching products with specific criteria.
export class ProductSearchModel extends BaseSearchModel {
  name: string | undefined = "";
}

// This class represents a product.
export class ProductModel {
  id: number | undefined = 0;
  name: string | undefined;
  productTypeId: number | undefined = 0;
  venueId: number | undefined = 0;
  team1Id: number | undefined = 0;
  team2Id: number | undefined = 0;
  startDateTime: string | undefined;
  endDateTime: string | undefined;
  scheduleDateTime: string | undefined;
  description: string | undefined;
  fileId: number | undefined = 0;
  file: FileUploadRequestModel | undefined;
}

// This class represents a paged list of products.
export class ProductListModel extends BasePagedListModel<ProductModel> {
}
