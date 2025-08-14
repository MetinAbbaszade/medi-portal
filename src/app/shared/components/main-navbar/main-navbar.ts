import { Component, inject, Input } from '@angular/core';
import { IRoutes } from '../../../app.interface';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule, MatToolbarRow } from "@angular/material/toolbar";
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedTranslateModule } from '../../modules/shared-translate.module';
import { ILanguage } from './modules/interface';
import { CommonModule } from '@angular/common';
import { PatientUser } from '../../../modules/auth/models';

@Component({
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
  ],
  templateUrl: './main-navbar.html',
  styleUrl: './main-navbar.css'
})
export class MainNavbar {
  @Input() changeLang!: (lang: string) => void;
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


}
