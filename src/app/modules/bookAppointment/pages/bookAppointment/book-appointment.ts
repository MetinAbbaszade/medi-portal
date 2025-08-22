import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";

interface Department { id: number; name: string; icon?: string; }
interface Hospital { id: number; name: string; location: string; }
interface Doctor { id: number; name: string; specialty: string; }

type AppointmentFormValue = {
  department: Department | null;
  hospital: Hospital | null;
  doctor: Doctor | null;
  date: string | null;
  time: string | null;
};

@Component({
  selector: 'app-book-appointment',
  imports: [
    CommonModule,
    MatButton,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
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
      icon: 'stethoscope',
      code: 'department'
    },
    {
      number: 2,
      title: 'Hospital',
      icon: 'apartment',
      code: 'hospital'
    },
    {
      number: 3,
      title: 'Doctor',
      icon: 'contacts_product',
      code: 'doctor'
    },
    {
      number: 4,
      title: 'Date & Time',
      icon: 'calendar_add_on',
      code: 'date'
    },
    {
      number: 5,
      title: 'Details',
      icon: 'file_export',
      code: 'concern'
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

  timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
  ]

  summaryData: { key: string; label: string; value: string; icon: string }[] = [];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      department: ['', Validators.required],
      hospital: ['', Validators.required],
      doctor: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });

    this.form.valueChanges.subscribe((event) => this.updateSummary())
  }

  updateSummary() {

    const raw = this.form.value as AppointmentFormValue;

    this.summaryData = Object.entries(raw).map(([key, value]) => {
      let displayName = '';
      let icon = '';
      switch (key) {

        case 'department':
        case 'hospital':
        case 'doctor':
          displayName = typeof value === 'object' && value !== null && 'name' in value ? value.name : ''
          icon = this.findIcon(key)
          break;
        case 'date':
          displayName = (typeof value === 'string' || typeof value === 'number') && value
            ? new Date(value).toLocaleDateString()
            : '';
          icon = this.findIcon('date');
          break;
        case 'time':
          displayName = typeof value === 'string' && value !== null ? value : '';
          icon = 'more_time';
          break;
        default:
          break;
      }

      return { key, label: key[0].toUpperCase() + key.slice(1), value: displayName, icon };
    })
  }

  get formEntries(): [string, any][] {
    return Object.entries(this.form.value || {});
  }
  goNext() {
    this.currentStep < this.steps.length ? this.currentStep++ : ''
  }

  goBack() {
    this.currentStep > 1 ? this.currentStep-- : ''
  }

  findIcon(name: string) {
    const data = this.steps.find((step) => step.code === name)
    return data!.icon
  }

  get summaryDataWithValue() {
    return this.summaryData.filter((data) => data.value)
  }

  ifSelected(id: number) {
    const step = this.steps.find((step) => step.number === id);
    return step ? this.form.get(step.code)?.value : null;
  }
}
