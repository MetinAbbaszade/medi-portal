import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export enum Languages {
  az = "Azərbaycanca",
  en = "English",
  ru = "Русский",
}

@Injectable({
  providedIn: 'root'
})
export class Translation {
  constructor(
    private translate: TranslateService
  ) {}

  setLang(lang: string): void {
    localStorage.setItem('lang', lang)
    this.translate.use(lang)
  }

  getLang() {
    return localStorage.getItem('lang')
  }
}
