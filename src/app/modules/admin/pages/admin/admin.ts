import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../auth.service';

@Component({
  selector: 'app-admin',
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {

  token!: any;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  constructor(
    private router: Router,
    private authService: AuthService
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
  ];

  ngOnInit(): void {
    this.token = this.authService.decodedToken
  }

  get CurrentRoute() {
    const url = this.router.url.split('?')[0];
    return url.slice(url.lastIndexOf('/') + 1);
  }

  focusInput() {
    this.searchInput.nativeElement.focus();
  }
}