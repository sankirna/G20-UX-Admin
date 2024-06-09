import { BasePagedListModel } from "./base-paged-list.model";
import { BaseSearchModel } from "./base-search.model";

// This class is used for searching categories with specific criteria.
export class SubCategorySearchModel extends BaseSearchModel {
    // The name of the category to search for.
    name: string | undefined = "";
}

// This class represents a category.
export class SubCategoryModel {
  id: number | undefined = 0;
  name: string | undefined;
  description: string | undefined;
  categoryId: number | undefined= 0;
}

export class SubCategoryListModel extends BasePagedListModel<SubCategoryModel> {
}
