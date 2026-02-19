import { Component, EventEmitter } from '@angular/core';
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
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from '../../../components/detail-component/detail-component';

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
    Gridview,
    TranslateModule,
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

  private refresh$ = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private adminService: AdminServices,
    private hospitalService: HospitalService,
    public translate: TranslateService,
    private dialog: MatDialog,
  ) { }

  form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      Name: null,
      SpecialtyId: null,
      Filter: null
    })

    this.fetchAllSpecialties();
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
    merge(this.form.valueChanges, this.refresh$)
      .pipe(
        startWith({}),
        switchMap((data: any) => {
          const params = this.getParams();
          return this.hospitalService.fetchHospitalData(params)
            .pipe(
              finalize(() => this.loading = false)
            );
        })
      )
      .subscribe(({ filteredHospitals }) => {
        this.dataSource = new MatTableDataSource(filteredHospitals);
        this.resultsLength = filteredHospitals.length;
      })
  }

  clearFiltiration() {
    this.form.reset();
  }

  getParams() {
    const params = {
      ...this.form.value
    }

    for (let item in params) {
      if (!params[item] || params[item] === null) {
        delete params[item];
      }
    }

    return params;
  }

  triggerRefresh() {
    this.refresh$.emit();
  }

  addNewHospital() {
    this.dialog.open(DetailComponent, {
      minHeight: '68%',
    });
  }
}
