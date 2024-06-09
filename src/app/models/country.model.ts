import { BasePagedListModel } from "./base-paged-list.model";
import { BaseSearchModel } from "./base-search.model";

export class CountrySearchModel extends BaseSearchModel{
    name: string | undefined="";
}

export class CountryModel {
    name: string | undefined;
    id: number | undefined=0;
 }

 export class CountryListModel extends BasePagedListModel<CountryModel> {

 }