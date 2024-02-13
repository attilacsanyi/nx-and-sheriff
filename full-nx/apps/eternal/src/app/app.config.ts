import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
  LOCALE_ID,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { securityInterceptor } from './shared/security/security-interceptor';
import { MatDateFnsModule } from '@angular/material-date-fns-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { deAT } from 'date-fns/locale';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ErrorHandlerService } from './core/error-handler.service';
import { loadingInterceptor } from './shared/ui-messaging/loader/loading.interceptor';
import { sharedUiMessagingProvider } from './shared/ui-messaging/shared-ui-messaging.provider';
import { baseUrlInterceptor } from './shared/http/base-url.interceptor';
import { errorInterceptor } from './shared/http/error.interceptor';
import { Configuration } from './shared/config/configuration';
import { sharedMasterDataProvider } from './shared/master-data/shared-master-data.provider';
import { holidaysInterceptor } from './holidays/api/holidays.interceptor';
import { customersInterceptor } from './customers/api/customers.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideClientHydration(),
    provideStore(),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([
        customersInterceptor,
        holidaysInterceptor,
        baseUrlInterceptor,
        loadingInterceptor,
        errorInterceptor,
        securityInterceptor,
      ]),
      withFetch(),
    ),
    provideStoreDevtools({ connectInZone: true }),
    ...sharedMasterDataProvider,
    ...sharedUiMessagingProvider,
    importProvidersFrom([MatDateFnsModule]),
    {
      provide: MAT_DATE_LOCALE,
      useValue: deAT,
    },
    { provide: LOCALE_ID, useValue: 'de-AT' },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    {
      provide: Configuration,
      useFactory: () =>
        new Configuration('https://api.eternal-holidays.net', true, true),
    }
  ],
};
