import { Component } from '@angular/core';
import { HospitalService } from '../../services/hospital-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Hospitaldialog } from '../../components/hospital-dialog/hospitaldialog';
import { IHospital } from '../../modules/data';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-hospital',
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatExpansionModule,
    MatSelectModule
  ],
  templateUrl: './hospital.html',
  styleUrl: './hospital.css'
})
export class Hospital {
  form!: FormGroup;
  hospitalData: any;
  searchResult: any;
  filterForm!: FormGroup;
  click: number = 0;

  constructor(
    private HospitalService: HospitalService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.searchResult = [];
    this.fetchData()
    this.form = this.fb.group({
      searchData: ''
    })

    this.filterForm = this.fb.group({
      speciality: ''
    })
  }

  fetchData() {
    this.HospitalService.fetchHospitalData()
      .subscribe((res) => {
        console.log(res)
        this.hospitalData = res;
      })
  }

  filterDatas(filterValue: any) {
    this.HospitalService.filterData(filterValue.searchData)
      .subscribe((res) => {
        console.log(res);
        this.searchResult = res;
      })
  }

  viewDetails(item: IHospital) {
    this.openDialog(Hospitaldialog, item)
  }

  openDialog(dialog: ComponentType<any>, data = {}) {
    this.dialog.open(dialog, {
      minWidth: '40%',
      height: '68%',
      data
    })
  }

  handleSubmit() {
    this.click += 1
    if (!this.form.value.searchData) {
      this.fetchData()
      return;
    }
    this.filterDatas(this.form.value)
  }
}

