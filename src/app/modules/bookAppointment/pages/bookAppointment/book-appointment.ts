import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-book-appointment',
  imports: [
    CommonModule,
    MatButton,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './book-appointment.html',
  styleUrl: './book-appointment.css'
})
export class BookAppointment {

  form!: FormGroup;

  currentStep: number = 1;
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

  hospitals = [
    { id: "general", name: "City General Hospital", location: "Downtown" },
    { id: "mercy", name: "Mercy Medical Center", location: "Westside" },
    { id: "regional", name: "Regional Health Center", location: "Northside" },
    { id: "university", name: "University Hospital", location: "Campus" },
  ]

  doctors = [
    { id: "smith", name: "Dr. Sarah Smith", specialty: "Cardiology" },
    { id: "johnson", name: "Dr. Michael Johnson", specialty: "Dermatology" },
    { id: "williams", name: "Dr. Emily Williams", specialty: "Pediatrics" },
    { id: "brown", name: "Dr. David Brown", specialty: "Orthopedics" },
  ]


  goNext() {
    this.currentStep < this.steps.length ? this.currentStep++ : ''
  }

  goBack() {
    this.currentStep > 1 ? this.currentStep-- : ''
  }

  constructor(
    private fb: FormBuilder
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

    this.form.valueChanges.subscribe((res) => console.log(res));
  }

  confirmAppointment() {
    console.log("Salam")
  }
}
