import { BasePagedListModel } from "./base-paged-list.model";
import { BaseSearchModel } from "./base-search.model";

// This class is used for searching roles with specific criteria.
export class RoleSearchModel extends BaseSearchModel {
  // The name of the role to search for.
  roleName: string | undefined = "";
}

// This class represents a role.
export class RoleModel {
  id: number | undefined = 0;
  name: string | undefined;
}

// This class represents a paginated list of roles.
export class RoleListModel extends BasePagedListModel<RoleModel> {
}
