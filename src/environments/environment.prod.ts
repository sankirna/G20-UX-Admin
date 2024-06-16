import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  apiUrl: 'https://localhost:7050/api/',
  production: true,
  logLevel: NgxLoggerLevel.OFF,
  defaultUrl:'https://localhost:7050/StaticFiles/Default_Image/no-image.jpg',
  serverLogLevel: NgxLoggerLevel.ERROR
};
