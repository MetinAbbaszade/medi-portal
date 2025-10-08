import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth.service';
import { PatientUser } from '../../../auth/models';
import { authInterceptor } from '../../../../interceptors/auth'
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

interface Appointment {
  patientName: string;
  date: string;
  time: string;
  type: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface Notification {
  message: string;
  time: string;
}

@Component({
  selector: 'app-profilecomponent',
  imports: [
    TranslateModule,
    CommonModule
  ],
  templateUrl: './profilecomponent.html',
  styleUrl: './profilecomponent.css',
})
export class Profilecomponent implements OnInit {
  token: any;
  appointments: Appointment[] = [];
  notifications: Notification[] = [];

  public translate = inject(TranslateModule)

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.token = this.authService.decodedToken;

    // Example static appointments (replace with API calls)
    this.appointments = [
      {
        patientName: 'John Smith',
        date: '2024-01-15',
        time: '09:00 AM',
        type: 'Consultation',
        status: 'confirmed'
      },
      {
        patientName: 'Emily Johnson',
        date: '2024-01-16',
        time: '11:30 AM',
        type: 'Consultation',
        status: 'pending'
      },
      {
        patientName: 'Michael Lee',
        date: '2024-01-18',
        time: '02:00 PM',
        type: 'Consultation',
        status: 'cancelled'
      }
    ];

    // Example static notifications (replace with API calls)
    this.notifications = [
      {
        message: 'Patient John Smith has a follow-up appointment tomorrow',
        time: '2 hours ago'
      },
      {
        message: 'New lab results available for Emily Johnson',
        time: '5 hours ago'
      },
      {
        message: 'Appointment with Michael Lee has been cancelled',
        time: '1 day ago'
      }
    ];
  }
}
