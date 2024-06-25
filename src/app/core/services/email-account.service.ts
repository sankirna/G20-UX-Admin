import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedListModel } from 'src/app/models/base-paged-list.model';
import { EmailAccountModel, EmailAccountSearchModel } from 'src/app/models/email-account.model';

@Injectable({
  providedIn: 'root'
})
export class EmailAccountService {
  constructor(private http: HttpClient) { }

  list(model: EmailAccountSearchModel) {
    const api = 'EmailAccount/List';
    return this.http.post<PagedListModel<EmailAccountModel>>(api, model, { params: { isPageType: true } });
  }

  get(id: number) {
    const api = 'EmailAccount/Get';
    return this.http.post<EmailAccountModel>(api, null, { params: { id: id } });
  }

  create(model: EmailAccountModel) {
    const api = 'EmailAccount/Create';
    return this.http.post<EmailAccountModel>(api, model);
  }

  update(model: EmailAccountModel) {
    const api = 'EmailAccount/Update';
    return this.http.post<EmailAccountModel>(api, model);
  }

  delete(id: number) {
    const api = 'EmailAccount/Delete';
    return this.http.post<number>(api, null, { params: { id: id } });
  }
}
