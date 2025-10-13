import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { authInterceptor } from './interceptors/auth';
import { HttpClient } from '@angular/common/http';
import { catchError, from, map, Observable } from 'rxjs';

export class CustomTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return from(import(`../assets/i18n/${lang}.json`)).pipe(
      map(module => module.default || module),
      catchError(() => {
        console.error(`Translation file for ${lang} not found`);
        return from(import(`../assets/i18n/en.json`)).pipe(
          map(module => module.default || module)
        );
      })
    );
  }
}

export function createTranslateLoader(http: HttpClient) {
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
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      })
    )
  ]
};