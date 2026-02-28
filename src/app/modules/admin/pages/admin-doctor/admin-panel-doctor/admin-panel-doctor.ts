import { ChangeDetectorRef, Component, EventEmitter, ViewChild } from '@angular/core';
import { ɵInternalFormsSharedModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatAnchor } from "@angular/material/button";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Gridview } from "../../../../../shared/components/gridview/gridview/gridview";
import { TranslateModule } from '@ngx-translate/core';
import { AdminServices } from '../../../services/admin-services';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, finalize, merge, startWith, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DoctorDetailComponent } from '../../../components/doctor-detail-component/doctor-detail-component';

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
    Gridview,
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

  dataSource!: MatTableDataSource<any>;
  resultsLength!: number;
  loading: boolean = false;

  fieldToColumnNames: any = [
    { column: 'name' },
    { column: 'surname' },
    { column: 'date_of_birth' },
    { column: 'email' },
    { column: 'adress' },
    { column: 'experience' },
  ];
  displayedColumns: Array<string> = ['expandAction', ...this.fieldToColumnNames.map((name: any) => name.column)];

  private refresh$ = new EventEmitter<void>();
  @ViewChild(Gridview) gridview!: Gridview;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminServices,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      hospital: '',
      specialty: '',
      department: '',
      name: '',
      sort: ''
    });

    this.fetchAllSpecialties();
    this.fetchAllDepartments();
    this.fetchAllHospitals();
  }

  ngAfterViewInit() {
    this.fetchDoctors();
  }

  fetchDoctors() {
    merge(
      this.form.valueChanges,
      this.refresh$,
      this.gridview.paginator.page,
    ).pipe(
      startWith({}),
      tap(() => {
        this.loading = true;
        this.dataSource = new MatTableDataSource();
        this.cdr.detectChanges();
      }),
      switchMap(() => {
        const params = this.getParams();

        return this.adminService.getDoctors(params)
          .pipe(
            finalize(() => this.loading = false)
          )
      })
    )
      .subscribe({
        next: ({ data }) => {
          this.dataSource = new MatTableDataSource(data.items);
          this.resultsLength = data.total;
        },
        error: (error) => {
          console.error(error);
        }
      })
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

  triggerRefresh() {
    this.refresh$.emit();
  }

  private getParams() {
    const params = {
      ...this.form.value,
      page: this.gridview.paginator.pageIndex + 1,
      pageSize: this.gridview.paginator.pageSize,
    }

    for (let item in params) {
      if (!params[item]) {
        delete params[item];
      }
    }

    return params;
  }

  addNewDoctor() {
    const ref = this.dialog.open(DoctorDetailComponent);

    ref.afterClosed().subscribe((result) => {
      this.triggerRefresh();
    })
  }
}
