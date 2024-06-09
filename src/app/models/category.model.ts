import { BasePagedListModel } from "./base-paged-list.model";
import { BaseSearchModel } from "./base-search.model";

// This class is used for searching categories with specific criteria.
export class CategorySearchModel extends BaseSearchModel {
    // The name of the category to search for.
    name: string | undefined = "";
}

// This class represents a category.
export class CategoryModel {
  id: number | undefined = 0;
  name: string | undefined;
  description: string | undefined;
}

export class CategoryListModel extends BasePagedListModel<CategoryModel> {
}
