import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomTranslateLoader implements TranslateLoader {
  private httpClient = inject(HttpClient);
  private basePath: string = '/assets/i18n/'; // Default path, can be changed dynamically

  constructor() { }

  // Method to set the base path dynamically
  public setBasePath(path: string): void {
    this.basePath = path;
  }

  getTranslation(lang: string): Observable<any> {
    // Construct the URL dynamically based on the current basePath
    const url = `${this.basePath}${lang}.json`;
    console.log(`Loading translation from: ${url}`); // For debugging
    return this.httpClient.get(url);
  }
}