import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MainNavbar } from "./shared/components/main-navbar/main-navbar";
import { TranslateService } from '@ngx-translate/core';
import { Translation } from './translation';


@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatIconModule,
    MainNavbar
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {


  constructor(
    private translate: TranslateService,
    private translateService: Translation,
    private router: Router
  ) {
    this.translate.addLangs(['en', 'az']);
    const browserLang = this.translate.getBrowserLang();
    const preferredLang = browserLang?.match(/en|az/) ? browserLang : 'en';
    this.translateService.setLang(preferredLang)
  }

  change(lang: string) {
    this.translateService.setLang(lang)
  }

  get getHideNavbar() {
    const hiddenRoutes = ['/login', '/signup', '/auth/login', '/auth/signup', '/page-not-found'];
    const url = this.router.url.split('?')[0]
    return hiddenRoutes.includes(url)
  }
}
