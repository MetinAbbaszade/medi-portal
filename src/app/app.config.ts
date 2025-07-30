// src/app/app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomTranslateLoader } from './custom-translate-loader';

export function CustomLoaderFactory(http: HttpClient) {
  return new CustomTranslateLoader();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Provides the HttpClient service, making it available for injection throughout your app (e.g., in CustomTranslateLoader).
    provideHttpClient(),
    provideAnimations(),

    importProvidersFrom(
      TranslateModule.forRoot({
        // This configuration object tells TranslateModule how to load translations.
        loader: {
          // Specifies that you are providing an implementation for the TranslateLoader token.
          provide: TranslateLoader,
          // Tells Angular to use the 'CustomLoaderFactory' function to create the instance of TranslateLoader.
          useFactory: CustomLoaderFactory, 
          deps: [HttpClient]
        }
      })
    )
  ]
};