import { Component, inject, ViewChild } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MainNavbar } from "./shared/components/main-navbar/main-navbar";
import { TranslateService } from '@ngx-translate/core';
import { Translation } from './translation';
import { SideNavService } from './sidenav.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Sidebar } from "./shared/components/sidebar/sidebar";
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatButtonModule } from "@angular/material/button";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatIconModule,
    MainNavbar,
    CommonModule,
    Sidebar,
    MatButtonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isMobile: boolean = false;
  open!: boolean;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private translate: TranslateService,
    private translateService: Translation,
    private router: Router,
    public sidenavService: SideNavService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.translate.addLangs(['en', 'az']);
    const browserLang = this.translate.getBrowserLang();
    const preferredLang = browserLang?.match(/en|az/) ? browserLang : 'en';
    this.translateService.setLang(preferredLang)
  }

  ngOnInit() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => document.querySelector('mat-sidenav-content')?.scrollTo({ top: 0, left: 0, behavior: "smooth" }));

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

    this.breakpointObserver
      .observe(['(max-width: 899px)'])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }

  toggleSideNav() {
    this.sidenav.toggle()
  }

  change = (lang: string) => {
    this.translateService.setLang(lang)
    console.log(lang)
  }

  get getHideNavbar() {
    const hiddenRoutes = ['/login', '/signup', '/auth', '/auth', '/page-not-found', '/admin'];
    const url = this.router.url.split('?')[0]
    const route = url.slice(0, url.lastIndexOf('/'))
    return hiddenRoutes.includes(route)
  }

  closeBtnEvent() {
    this.sidenav.close()
  }
}