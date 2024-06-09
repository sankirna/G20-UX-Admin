import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  apiUrl: 'https://localhost:7050/api/',
  production: true,
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR
};
