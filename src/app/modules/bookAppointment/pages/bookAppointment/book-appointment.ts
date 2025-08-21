import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-book-appointment',
  imports: [
    CommonModule,
    MatButton
  ],
  templateUrl: './book-appointment.html',
  styleUrl: './book-appointment.css'
})
export class BookAppointment {

  form!: FormGroup;
  steps = [
    {
      number: 1,
      title: 'Department',
      icon: 'stethoscope'
    },
    {
      number: 2,
      title: 'Hospital',
      icon: 'apartment'
    },
    {
      number: 3,
      title: 'Doctor',
      icon: 'contacts_product'
    },
    {
      number: 4,
      title: 'Date & Time',
      icon: 'calendar_add_on'
    },
    {
      number: 5,
      title: 'Details',
      icon: 'file_export'
    }
  ];

  departments = [
    { id: "cardiology", name: "Cardiology", icon: "❤️" },
    { id: "dermatology", name: "Dermatology", icon: "🧴" },
    { id: "pediatrics", name: "Pediatrics", icon: "👶" },
    { id: "orthopedics", name: "Orthopedics", icon: "🦴" },
    { id: "neurology", name: "Neurology", icon: "🧠" },
    { id: "oncology", name: "Oncology", icon: "🎗️" },
  ]


  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      department: ['', Validators.required],
      hospital: ['', Validators.required],
      doctor: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      concern: ['', Validators.required],
    });
  }

  updateField(field: string, value: any) {
    this.form.get(field)?.setValue(value);
    this.appointmentService.updateAppointment({ [field]: value });
  }

  submit() {
    if (this.form.valid) {
      console.log('Appointment confirmed', this.form.value);
    }
  }

}
