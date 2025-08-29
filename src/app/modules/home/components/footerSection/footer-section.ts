import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedTranslateModule } from '../../../../shared/modules/shared-translate.module';
import { TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

@Component({
  selector: 'app-footer-section',
  imports: [
    MatIconModule,
    SharedTranslateModule,
    RouterLink
  ],
  templateUrl: './footer-section.html',
  styleUrl: './footer-section.css'
})
export class FooterSection {

  public translate = inject(TranslateService)

  quickLinks = [
    {
      label: 'hospitals',
      href: '/hospital'
    },
    {
      label: 'doctors',
      href: '/doctor'
    },
    {
      label: 'about',
      href: '/about'
    },
    {
      label: 'contact',
      href: '/contact',
    },
    {
      label: 'login',
      href: '/login'
    }
  ]

  // services = ['bookAppointment', 'findDoctor', 'emergencyCare', 'insurance'].map((label) => ({label}))

  services = [
    {
      label: 'bookAppointment',
      href: '/book-appointment'
    },
    {
      label: 'findDoctor',
      href: '/doctor'
    },
    {
      label: 'emergencyCare',
      href: '/about'
    },
    {
      label: 'insurance',
      href: '/contact'
    }
  ]
}
