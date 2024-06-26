import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  apiUrl: 'http://13.60.99.168/api/api/',
  production: true,
  logLevel: NgxLoggerLevel.OFF,
  defaultUrl:'http://13.60.99.168/api/api/StaticFiles/Default_Image/no-image.jpg',
  serverLogLevel: NgxLoggerLevel.ERROR
};
