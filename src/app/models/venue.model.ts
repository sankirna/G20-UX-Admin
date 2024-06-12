import { BasePagedListModel } from "./base-paged-list.model";
import { BaseSearchModel } from "./base-search.model";
import { VenueTicketCategoryMapModel } from "./venue-ticket-category-map.model";

// This class is used for searching categories with specific criteria.
export class VenueSearchModel extends BaseSearchModel {
    // The name of the category to search for.
    StadiumName: string | undefined = "";
}

// This class represents a category.
export class VenueModel {
  id: number | undefined = 0;
  stadiumName: string | undefined;
  location: string | undefined;
  countryId: number | undefined= 0;
  countryName: string | undefined;
  capacity: string | undefined;
  venueTicketCategories: VenueTicketCategoryMapModel[]=[];
}

export class VenueListModel extends BasePagedListModel<VenueModel> {
}
