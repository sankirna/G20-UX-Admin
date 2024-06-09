import { NgModule, Optional, SkipSelf, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MediaMatcher } from '@angular/cdk/layout';
import { NGXLogger } from 'ngx-logger';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { throwIfAlreadyLoaded } from './guards/module-import.guard';
import { GlobalErrorHandler } from './services/globar-error.handler';
import { AdminGuard } from './guards/admin.guard';
import { PaginatorInterceptor } from './interceptors/paginator.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { initializeApp } from '../app-init.factory';
import { CommonService } from './services/common.service';
import { FileService } from './services/file.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    MediaMatcher,
    FileService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [CommonService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PaginatorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    { provide: NGXLogger, useClass: NGXLogger },
    { provide: 'LOCALSTORAGE', useValue: window.localStorage }
  ],
  exports: [
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
