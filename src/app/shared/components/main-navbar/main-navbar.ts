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
import { Translation } from '../../../translation';

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
  public translate = inject(TranslateService);
  // Uses the 'inject' function to get an instance of the TranslateService.
  constructor(
    private translateService: Translation
  ) { 
  }

  routes: IRoutes[] = [
    {
      icon: 'local_hospital', // 🏥 Hospital icon
      href: 'hospital'
    },
    {
      icon: 'medical_services', // 🩺 Doctor/medical-related icon
      href: 'doctor'
    },
    {
      icon: 'info', // ℹ️ About icon
      href: 'about'
    },
    {
      icon: 'mail', // ✉️ Contact icon
      href: 'contact'
    }
  ]

  languages: ILanguage = {
    'az': "Azərbaycanca",
    'en': "English"
  }
}
