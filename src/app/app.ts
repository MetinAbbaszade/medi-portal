import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { IRoutes } from './app.interface';
import { MatToolbarRow } from "@angular/material/toolbar";
import { MatIconModule } from '@angular/material/icon';


@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarRow,
    MatIconModule,
    RouterLink
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MediPortal');

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
