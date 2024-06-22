import { BasePagedListModel } from "./base-paged-list.model";
import { BaseSearchModel } from "./base-search.model";
import { FileUploadRequestModel } from "./file.model";
import { ProductCombosModel } from "./product-combos.model";
import { ProductTicketCategoryMapModel } from "./product-ticket-category-map.model";

// This class is used for searching products with specific criteria.
export class ProductSearchModel extends BaseSearchModel {
  name: string | undefined = "";
  productTypeId: number | undefined ;
}

// This class represents a product.
export class ProductModel {
  id: number | undefined = 0;
  name: string | undefined;
  productTypeId: number | undefined = 0;
  categoryId: number | undefined;
  venueId: number | undefined;
  team1Id: number | undefined ;
  team2Id: number | undefined ;
  startDateTime: string | undefined;
  endDateTime: string | undefined;
  scheduleDateTime: string | undefined;
  description: string | undefined;
  fileId: number | undefined ;
  file: FileUploadRequestModel | undefined;
  productTicketCategories: ProductTicketCategoryMapModel[]=[];
  productCombos:ProductCombosModel[]=[];
}

// This class represents a paged list of products.
export class ProductListModel extends BasePagedListModel<ProductModel> {
}



