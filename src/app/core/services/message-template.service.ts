import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedListModel } from 'src/app/models/base-paged-list.model';
import { MessageTemplateModel, MessageTemplateSearchModel } from 'src/app/models/message-template.model';

@Injectable({
  providedIn: 'root'
})
export class MessageTemplateService {
  constructor(private http: HttpClient) { }

  list(model: MessageTemplateSearchModel) {
    const api = 'MessageTemplate/List';
    return this.http.post<PagedListModel<MessageTemplateModel>>(api, model, { params: { isPageType: true } });
  }

  get(id: number) {
    const api = 'MessageTemplate/Get';
    return this.http.post<MessageTemplateModel>(api, null, { params: { id: id } });
  }

  create(model: MessageTemplateModel) {
    const api = 'MessageTemplate/Create';
    return this.http.post<MessageTemplateModel>(api, model);
  }

  update(model: MessageTemplateModel) {
    const api = 'MessageTemplate/Update';
    return this.http.post<MessageTemplateModel>(api, model);
  }

  delete(id: number) {
    const api = 'MessageTemplate/Delete';
    return this.http.post<number>(api, null, { params: { id: id } });
  }
}
