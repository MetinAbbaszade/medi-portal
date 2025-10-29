import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {

  information_cards: Array<any> = [
    {
      icon: 'apartment',
      label: "Total Hospitals",
      count: 24,
      percentage: 13
    },
    {
      icon: 'stethoscope',
      label: 'Total Doctors',
      count: 342,
      percentage: 8
    },
    {
      icon: 'calendar_today',
      label: 'Appointments Today',
      count: 156,
      percentage: 23
    },
    {
      icon: 'trending_up',
      label: 'Users',
      count: 2846,
      percentage: 15
    }
  ];

  doctor_cards: Array<any> = [
    {
      name: 'Emily Chen',
      specialty: 'Cardiology',
      patient_count: '45'
    },
    {
      name: 'Emily Chen',
      specialty: 'Cardiology',
      patient_count: '45'
    },
    {
      name: 'Emily Chen',
      specialty: 'Cardiology',
      patient_count: '45'
    },
      {
        name: 'Emily Chen',
        specialty: 'Cardiology',
        patient_count: '45'
      },
  ]
}
