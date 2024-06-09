import { BasePagedListModel } from "./base-paged-list.model";
import { BaseSearchModel } from "./base-search.model";

export class StateSearchModel extends BaseSearchModel {
    name: string | undefined = "";
    countryId: number | undefined = 0;
}

export class StateModel {
    name: string | undefined;
    id: number | undefined = 0;
    countryId: number | undefined = 0;
}

export class StateListModel extends BasePagedListModel<StateModel> {

}
