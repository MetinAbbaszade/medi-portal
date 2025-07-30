import { Injectable } from '@angular/core';

export enum Languages {
  az = "Azərbaycanca",
  en = "English",
  ru = "Русский",
}

@Injectable({
  providedIn: 'root'
})
export class Translation {
  constructor() { }

  setLang(lang: string): void {
    localStorage.setItem('lang', lang)
  }

  getLang() {
    return localStorage.getItem('lang')
  }
}
