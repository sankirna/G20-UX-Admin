import { BasePagedListModel } from "./base-paged-list.model";
import { BaseSearchModel } from "./base-search.model";

// This class is used for searching message templates with specific criteria.
export class MessageTemplateSearchModel extends BaseSearchModel {
  // The name of the message template to search for.
  name: string | undefined = "";
}

// This class represents a message template.
export class MessageTemplateModel {
  id: number | undefined = 0;
  name: string | undefined;
  bccEmailAddresses: string | undefined;
  subject: string | undefined;
  body: string | undefined;
  isActive: boolean | undefined;
  delayBeforeSend: number | undefined;
  delayPeriodId: number | undefined;
  attachedDownloadId: string | undefined;
  allowDirectReply: boolean | undefined;
  emailAccountId: string | undefined;
  limitedToStores: string | undefined;
  delayPeriod: number | undefined;
}

// This class represents a paginated list of message templates.
export class MessageTemplateListModel extends BasePagedListModel<MessageTemplateModel> {
}


