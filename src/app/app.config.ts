import { NgxSpinnerModule } from 'ngx-spinner';
import { provideToastr } from 'ngx-toastr';
import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {provideAnimations} from "@angular/platform-browser/animations"
import {CookieService} from 'ngx-cookie-service';
import { headersInterceptor } from './Core/Interceptors/headers-interceptor';
import { errorInterceptorInterceptor } from './Core/Interceptors/error-interceptor-interceptor';
import { loadingScreenInterceptor } from './Core/Interceptors/loading-screen-interceptor';



export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),withInterceptors([headersInterceptor,errorInterceptorInterceptor,loadingScreenInterceptor])),
    provideAnimations(),

    importProvidersFrom(CookieService,NgxSpinnerModule),
    provideToastr(),
  ]
};
