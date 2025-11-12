import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { CalendarModule, CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    CalendarModule,
    CommonModule
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
  providers: [DatePipe]
})
export class AdminDashboard {

  formattedDate: string | null = null;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  selectedDate: Date | null = null;


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


  constructor(
    private datePipe: DatePipe
  ) { }

  prevMonth() {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() - 1));
  }

  nextMonth() {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() + 1));
  }

  handleDayClick(day: any): void {
    if (day && day.date) {
      this.selectedDate = day.date;
    }
    else if (day && day.day && day.day.date) {
      this.selectedDate = day.day.date;
    }

    this.formattedDate = this.datePipe.transform(this.selectedDate, 'dd.MM.yyyy');

    console.log('Formatted Date:', this.formattedDate);
  }

  isDaySelected(day: any): boolean {
    if (!this.selectedDate) {
      return false;
    }
    return day.date.toDateString() === this.selectedDate.toDateString();
  }
}
