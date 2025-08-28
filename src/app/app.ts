import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MainNavbar } from "./shared/components/main-navbar/main-navbar";
import { TranslateService } from '@ngx-translate/core';
import { Translation } from './translation';
import { SideNavService } from './sidenav.service';
import { Menu } from './menu/menu';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatIconModule,
    MainNavbar,
    Menu,
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  open!: boolean;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private translate: TranslateService,
    private translateService: Translation,
    private router: Router,
    public sidenavService: SideNavService
  ) {
    this.translate.addLangs(['en', 'az']);
    const browserLang = this.translate.getBrowserLang();
    const preferredLang = browserLang?.match(/en|az/) ? browserLang : 'en';
    this.translateService.setLang(preferredLang)
  }

  ngOnInit() {
    this.sidenavService.state.subscribe(state => {
      switch (state) {
        case 'open':
          this.sidenav.open();
          break;
        case 'close':
          this.sidenav.close();
          break;
      }

    })
  }

  toggleSideNav() {
    this.sidenav.toggle()
  }

  change = (lang: string) => {
    this.translateService.setLang(lang)
    console.log(lang)
  }

  get getHideNavbar() {
    const hiddenRoutes = ['/login', '/signup', '/auth/login', '/auth/signup', '/page-not-found'];
    const url = this.router.url.split('?')[0]
    return hiddenRoutes.includes(url)
  }

  closeBtnEvent() {
    this.sidenav.close()
  }
}