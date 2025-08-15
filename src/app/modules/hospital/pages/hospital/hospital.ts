import { Component } from '@angular/core';
import { HospitalService } from '../../services/hospital-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Hospitaldialog } from '../../components/hospital-dialog/hospitaldialog';
import { IHospital } from '../../modules/data';

@Component({
  selector: 'app-hospital',
  imports: [
    CommonModule,
    RouterLink,

  ],
  templateUrl: './hospital.html',
  styleUrl: './hospital.css'
})
export class Hospital {
  hospitalData: any;
  constructor(
    private HospitalService: HospitalService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.HospitalService.fetchHospitalData()
      .subscribe((res) => {
        this.hospitalData = res;
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
}

