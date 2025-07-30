import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  // providedIn: 'root': This tells Angular that this service should be available application-wide (singleton instance)
  // and automatically configured when the app starts.
  providedIn: 'root'
})
// This means it promises to provide the 'getTranslation' method as required by the interface.
export class CustomTranslateLoader implements TranslateLoader {

  // This gets an instance of HttpClient, which will be used to make the actual HTTP request to fetch translation files.
  private httpClient = inject(HttpClient);
  private basePath: string = '/assets/i18n/';

  constructor() { }

  public setBasePath(path: string): void {
    this.basePath = path;
  }

  // It takes a 'lang' parameter (e.g., 'en', 'es') and must return an Observable that emits the translation object for that language.
  getTranslation(lang: string): Observable<any> {

    const url = `${this.basePath}${lang}.json`;
    // Uses the injected HttpClient to make an HTTP GET request to the constructed URL.
    return this.httpClient.get(url);
  }
}