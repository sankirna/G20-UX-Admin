import { BasePagedListModel } from "./base-paged-list.model";
import { BaseSearchModel } from "./base-search.model";

export class CitySearchModel extends BaseSearchModel {
    name: string | undefined = "";
    stateId: number | undefined = 0;
}

export class CityModel {
    name: string | undefined;
    id: number | undefined = 0;
    countryId: number | undefined = 0;
    stateId: number | undefined = 0;
}

export class CityListModel extends BasePagedListModel<CityModel> {

}
