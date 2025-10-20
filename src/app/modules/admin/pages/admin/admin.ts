import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

  constructor(
    private router: Router
  ) { }
  public navigation_links = [
    {
      icon: 'space_dashboard',
      label: 'Dashboard',
      link: 'dashboard'
    },
    {
      icon: 'local_hospital',
      label: 'Hospitals',
      link: 'hospitals'
    },
    {
      icon: 'medical_information',
      label: 'Doctors',
      link: 'doctors'
    },
    {
      icon: 'personal_injury',
      label: 'Patients',
      link: 'patients'
    },
    {
      icon: 'event_available',
      label: 'Appointments',
      link: 'appointments'
    },
    {
      icon: 'schedule',
      label: 'Timetable',
      link: 'timetable'
    },
    {
      icon: 'payments',
      label: 'Payments',
      link: 'payments'
    },
    {
      icon: 'bar_chart',
      label: 'Reports',
      link: 'reports'
    },
  ];

  get CurrentRoute() {
    const url = this.router.url.split('?')[0];
    return url.slice(url.lastIndexOf('/') + 1);
  }
}