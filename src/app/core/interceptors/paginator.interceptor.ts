import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, map } from "rxjs";
import { PagedListModel, PaggerModel } from "src/app/models/base-paged-list.model";

@Injectable()
export class PaginatorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isPageType = request.params.get('isPageType');
    return next.handle(request).pipe(map((event: HttpEvent<any>) => {
      if (!(event instanceof HttpResponse)) return event;
      return event.clone({ body: this.modifyBody(event.body, request, isPageType) });
    },
      (err: any) => {

      }));
  }

  private modifyBody(body: any, request: HttpRequest<any>, isPageType: any) {
    if (isPageType == 'true') {
      let dataPaggerModel = new PagedListModel();
      dataPaggerModel.data = body.data;
      var paggerModel = new PaggerModel();
      paggerModel.length = body.recordsTotal;
      paggerModel.pageSize = 10;
      paggerModel.pageIndex = request.body.start / paggerModel.pageSize;
      dataPaggerModel.paggerModel = paggerModel;
      return dataPaggerModel;
    }
    return body;
  }

}
