import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";
import { AppointmentService } from '../../services/appointment.service';
import { IHospital } from '../../../hospital/modules/data';
import { ApiResponse, Slots, Specialty } from '../../models/doctor.model';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { MatExpansionModule } from "@angular/material/expansion";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface Department { id: string; name: string; icon?: string; }
interface Hospital { id: string; name: string; location: string; image: string; }
interface Doctor { id: string; name: string; specialties: ISpecialty[]; }

export type ISpecialty = Specialty;

type AppointmentFormValue = {
  department: Department | null;
  hospital: Hospital | null;
  doctor: Doctor | null;
  date: string | null;
  time: string | null;
};

interface IDepartmentRes {
  id: string;
  name: string;
  icon: string;
}

export interface IDepartmentResponse {
  departments: IDepartmentRes[];
}



@Component({
  selector: 'app-book-appointment',
  imports: [
    CommonModule,
    MatButton,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatExpansionModule
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
      code: 'department_id'
    },
    {
      number: 2,
      title: 'Hospital',
      icon: 'apartment',
      code: 'hospital_id'
    },
    {
      number: 3,
      title: 'Doctor',
      icon: 'contacts_product',
      code: 'doctor_id'
    },
    {
      number: 4,
      title: 'Date & Time',
      icon: 'calendar_add_on',
      code: 'date'
    },
    {
      number: 5,
      title: 'Note',
      icon: 'file_export',
      code: 'note'
    }
  ];

  departments: Department[] = [];
  hospitals: Hospital[] = [];
  doctors: Doctor[] = [];
  timeSlots: Slots[] = []
  summaryData: { key: string; label: string; value: string; icon: string }[] = [];

  utc = new Date().toJSON().slice(0, 10).replace(/-/g, '-');

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      department_id: ['', Validators.required],
      hospital_id: ['', Validators.required],
      doctor_id: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      note: ['', Validators.required],
    });

    this.form.valueChanges.subscribe(() => this.updateSummary())

    this.appointmentService.fetchDepartmentsData()
      .subscribe((res: IDepartmentResponse) => {
        this.departments = res.departments;
      });


    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.valueChanges.subscribe(value => {
        switch (key) {
          case 'doctor_id':
            break;

          case 'hospital_id':
            this.appointmentService.fetchDoctorsByHospitalsAndDepartment(value.id, this.form.get('department_id')?.value.id)
              .subscribe(({ response }: ApiResponse) => {
                this.doctors = response.map(({ id, surname, name, specialties }) => {
                  return ({
                    id, surname, name, specialties
                  })
                })
              })
            break;

          case 'department_id':
            this.appointmentService.fetchHospitalsByDepartment(value.id)
              .subscribe((res) => {
                this.hospitals = res.hospitals.map<Hospital>(({ id, name, adresses, image }: IHospital) => ({
                  id, name, location: adresses[0].city, image
                }))
              })
            break;

          case 'date':
            this.appointmentService.fetchDoctorScheduleByDate(this?.form?.get('doctor_id')?.value.id, value)
              .subscribe((res) => {
                this.timeSlots = res.slots;
              }
              )
            break;

          default:
            break;
        }

      });
    });
  }

  updateSummary() {
    const raw = this.form.value as AppointmentFormValue;
    this.summaryData = Object.entries(raw).map(([key, value]) => {
      let displayName = '';
      let icon = '';
      switch (key) {

        case 'department_id':
        case 'hospital_id':
        case 'doctor_id':

          displayName = typeof value === 'object' && value !== null && 'name' in value ? value.name : '';
          icon = this.findIcon(key);
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
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
      this.scrollTop()
    }
  }


  scrollTop() {
    document.querySelector('mat-sidenav-content')?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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

  submitAppointment() {
    this.form.patchValue({
      department_id: this.form.get("department_id")?.value.id,
      hospital_id: this.form.get("hospital_id")?.value.id,
      doctor_id: this.form.get("doctor_id")?.value.id,
    })

    this.appointmentService.submitAppointment(this.form.value)
      .subscribe((res) => {
        if (!res) {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Email or Password is incorrect',
            confirmButtonText: 'OK'
          });
          this.form.reset();
          this.currentStep = 1;
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Appoint Successfully booked',
            confirmButtonText: 'OK'
          });
          this.form.reset();
          this.router.navigate(['/home']);
        }
      });
  }

  validate(dateString: any) {
    const day = (new Date(dateString)).getDay();
    if (day == 0 || day == 6) {
      return false;
    }
    return true;
  }

  eventClick(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!this.validate(input.value)) {
      input.value = '';
      this.form.get("date")?.setValue('');
      alert("Please select one of the workday");
    }
  }

  goBack() {
    if (this.currentStep > 1) {
      this.resetValuesFromStep(this.currentStep);
      this.currentStep--;
      this.scrollTop();
    }
  }


  resetValuesFromStep(step: number) {
    switch (step) {
      case 2:
        this.form.patchValue({
          hospital_id: '',
          doctor_id: '',
          date: '',
          time: '',
          note: '',
        });
        this.hospitals = [];
        this.doctors = [];
        this.timeSlots = [];
        break;

      case 3:
        this.form.patchValue({
          doctor_id: '',
          date: '',
          time: '',
          note: '',
        });
        this.doctors = [];
        this.timeSlots = [];
        break;

      case 4:
        this.form.patchValue({
          date: '',
          time: '',
          note: '',
        });
        this.timeSlots = [];
        break;

      case 5:
        this.form.patchValue({
          note: ''
        });
        break;
    }
  }

}
