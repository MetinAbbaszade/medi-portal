import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { MatAnchor } from "@angular/material/button";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AdminServices } from '../../../services/admin-services';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Gridview } from "../../../../../shared/components/gridview/gridview/gridview";
import { MatTableDataSource } from '@angular/material/table';
import { HospitalService } from '../../../../hospital/services/hospital-service';
import { finalize, merge, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-admin-hospital',
  imports: [
    MatAnchor,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    Gridview
  ],
  templateUrl: './admin-hospital.html',
  styleUrl: './admin-hospital.css'
})
export class AdminHospital {

  specialties: any = [];
  departments: any = [];
  types: any = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  resultsLength: number = 0;
  loading: boolean = false;
  fieldToColumnNames: any = [
    { column: 'id' },
    { column: 'name' },
    { column: 'type' },
    { column: 'description' }
  ];
  displayedColumns: Array<string> = ['expandAction', ...this.fieldToColumnNames.map((name: any) => name.column)];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminServices,
    private hospitalService: HospitalService,
  ) { }

  form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      departmentId: null,
      specialtyId: null,
      name: null,
      type: null
    })

    this.fetchAllSpecialties();
    this.fetchAllDepartments();
    this.fetchData();
  }

  fetchAllSpecialties() {
    this.adminService.getAllSpecialties()
      .subscribe({
        next: (response: any) => {
          this.specialties = response.specialties;
        },
        error: (error) => {
          this.handleError(error);
        }
      })
  }

  fetchAllDepartments() {
    this.adminService.getDepartments()
      .subscribe({
        next: (response: any) => {
          this.departments = response.departments;
        },
        error: (error) => {
          this.handleError(error);
        }
      })
  }

  handleError(error: any = 'Error') {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: error,
      confirmButtonText: 'OK'
    });
  }

  fetchData() {
    this.loading = true;
    merge(this.form.valueChanges)
      .pipe(
        startWith({}),
        switchMap((data: any) => {
          return this.hospitalService.fetchHospitalData()
            .pipe(
              finalize(() => this.loading = false)
            );
        })
      )
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.filteredHospitals);
        this.resultsLength = res.filteredHospitals.length;
      })
  }
}
