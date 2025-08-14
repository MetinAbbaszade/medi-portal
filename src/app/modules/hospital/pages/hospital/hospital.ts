import { Component } from '@angular/core';
import { HospitalService } from '../../services/hospital-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Hospitaldialog } from '../../components/hospital-dialog/hospitaldialog';

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

  viewDetails() {
    this.openDialog(Hospitaldialog)
  }
  
  openDialog(dialog: ComponentType<any>) {
    this.dialog.open(dialog, {
      minWidth: '70%',
      height: '70%',
      data: { message: 'Hello World' }
    })
  }
}

