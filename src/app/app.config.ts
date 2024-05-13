import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import routes from './app.routes';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideEnvironmentNgxMask(),{provide: LocationStrategy, useClass: HashLocationStrategy}]
};
