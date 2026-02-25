import { Component } from '@angular/core';
import { ɵInternalFormsSharedModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatAnchor } from "@angular/material/button";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Gridview } from "../../../../../shared/components/gridview/gridview/gridview";
import { TranslateModule } from '@ngx-translate/core';
import { AdminServices } from '../../../services/admin-services';

@Component({
  selector: 'app-admin-panel-doctor',
  imports: [
    MatAnchor,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    // Gridview,
    TranslateModule,
  ],
  templateUrl: './admin-panel-doctor.html',
  styleUrl: './admin-panel-doctor.css'
})
export class AdminPanelDoctor {

  form!: FormGroup;
  specialties !: any[];
  departments !: any[];
  hospitalList !: any[];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminServices,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      Hospital: '',
      Specialty: '',
      Department: '',
      Name: '',
      Sort: ''
    });

    this.fetchAllSpecialties();
    this.fetchAllDepartments();
    this.fetchAllHospitals();
  }

  clearFiltiration() {
    this.form.reset();
  }

  fetchAllSpecialties() {
    this.adminService.getAllSpecialties()
      .subscribe({
        next: (res) => {
          this.specialties = res.specialties;
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  fetchAllDepartments() {
    this.adminService.getDepartments()
      .subscribe({
        next: (res) => {
          this.departments = res.departments;
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  fetchAllHospitals() {
    this.adminService.getHospitalList().subscribe({
      next: ({ hospital }) => {
        this.hospitalList = hospital;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
