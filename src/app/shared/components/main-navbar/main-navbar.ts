import { Component } from '@angular/core';
import { IRoutes } from '../../../app.interface';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarRow } from "@angular/material/toolbar";
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-navbar',
  imports: [
    MatSidenavModule,
    MatToolbarRow,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './main-navbar.html',
  styleUrl: './main-navbar.css'
})
export class MainNavbar {
  routes: IRoutes[] = [
    {
      icon: 'local_hospital', // 🏥 Hospital icon
      label: 'Hospitals',
      href: 'hospital'
    },
    {
      icon: 'medical_services', // 🩺 Doctor/medical-related icon
      label: 'Doctors',
      href: 'doctor'
    },
    {
      icon: 'info', // ℹ️ About icon
      label: 'About',
      href: 'about'
    },
    {
      icon: 'mail', // ✉️ Contact icon
      label: 'Contact',
      href: 'contact'
    }
  ]

  languages: string[] = ['aze', 'rus', 'en']
}
