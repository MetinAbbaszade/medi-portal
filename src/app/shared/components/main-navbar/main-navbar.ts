import { ChangeDetectorRef, Component, inject, Input, ViewChild } from '@angular/core';
import { IRoutes } from '../../../app.interface';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule, MatToolbarRow } from "@angular/material/toolbar";
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedTranslateModule } from '../../modules/shared-translate.module';
import { ILanguage } from './modules/interface';
import { CommonModule } from '@angular/common';
import { PatientUser } from '../../../modules/auth/models';
import { filter } from 'rxjs';
import { MatButtonModule } from "@angular/material/button";
import { SideNavService } from '../../../sidenav.service';
import { PermittedIfDirective } from "../../../directives/permitted-if.directive";

@Component({
  standalone: true,
  selector: 'app-main-navbar',
  imports: [
    MatSidenavModule,
    MatToolbarRow,
    MatIconModule,
    RouterLink,
    SharedTranslateModule,
    MatToolbarModule,
    MatMenuModule,
    CommonModule,
    MatButtonModule,
    PermittedIfDirective
  ],
  templateUrl: './main-navbar.html',
  styleUrl: './main-navbar.css'
})
export class MainNavbar {
  activeUrl: string = '';
  constructor(
    private router: Router,
    public sideNavService: SideNavService
  ) { }

  @ViewChild('sidenav') sidenav!: MatSidenav;
  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.activeUrl = event.urlAfterRedirects
      });
  }
  @Input() changeLang!: (lang: string) => void;
  @Input() toggleSidenav!: () => void;
  token: PatientUser = JSON.parse(localStorage.getItem('token') || '{}') as PatientUser;

  // Uses the 'inject' function to get an instance of the TranslateService.
  public translate = inject(TranslateService);
  routes: IRoutes[] = [
    {
      icon: 'local_hospital',
      href: 'hospital'
    },
    {
      icon: 'info',
      href: 'about'
    },
    {
      icon: 'mail',
      href: 'contact'
    }
  ]
  languages: ILanguage = {
    'az': "Azərbaycanca",
    'en': "English"
  }

  get getHideNavbar() {
    const hiddenRoutes = ['/profile'];
    const url = this.router.url.includes('?') ? this.router.url.split('?')[0] : this.router.url
    return hiddenRoutes.includes(url)
  }

  logoutfunction() {
    localStorage.removeItem('token');
    this.router.navigate(
      ['/auth/login'],
      { queryParams: { redirectTo: 'home' } }
    );
  }
}
