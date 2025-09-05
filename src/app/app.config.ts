import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomTranslateLoader } from './custom-translate-loader';
import { MatDialogModule } from '@angular/material/dialog';
import { authInterceptor } from './interceptors/auth';
import { HttpClient } from '@angular/common/http';

export function CustomLoaderFactory(http: HttpClient) {
  return new CustomTranslateLoader();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    importProvidersFrom(MatDialogModule),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: CustomLoaderFactory,
          deps: [HttpClient]
        }
      })
    )
  ]
};
