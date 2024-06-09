import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, map } from "rxjs";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isPageType = request.params.get('isPageType');
    return next.handle(request).pipe(map((event: HttpEvent<any>) => {
      if (!(event instanceof HttpResponse)) return event;
      return event.clone({ body: this.modifyBody(event.body, isPageType) });
    },
      (err: any) => {

      }));
  }

  private modifyBody(body: any, isPageType: any) {
    return body.data;
    /*
    * write your logic to modify the body
    * */
  }

}
