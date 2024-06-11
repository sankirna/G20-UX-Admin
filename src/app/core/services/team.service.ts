import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedListModel } from 'src/app/models/base-paged-list.model';
import { TeamModel, TeamSearchModel } from 'src/app/models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(private http: HttpClient) { }

  list(model: TeamSearchModel) {
    const api = 'Team/List';
    return this.http.post<PagedListModel<TeamModel>>(api, model, { params: { isPageType: true } });
  }

  get(id: number) {
    const api = 'Team/Get';
    return this.http.post<TeamModel>(api, null, { params: { id: id } });
  }

  create(model: TeamModel) {
    const api = 'Team/Create';
    return this.http.post<TeamModel>(api, model);
  }

  update(model: TeamModel) {
    const api = 'Team/Update';
    return this.http.post<TeamModel>(api, model);
  }

  delete(id: number) {
    const api = 'Team/Delete';
    return this.http.post<number>(api, null, { params: { id: id } });
  }
}
