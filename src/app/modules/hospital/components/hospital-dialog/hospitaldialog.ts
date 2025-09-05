import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Capacity, IHospital } from '../../modules/data';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hospitaldialog',
  imports: [
    CommonModule,
  ],
  templateUrl: './hospitaldialog.html',
  styleUrl: './hospitaldialog.css'
})
export class Hospitaldialog {
  hospitalInfo = [
    {
      icon: "emergency",
      name: "EmergencyCapacity",
      value: 'emergency_capacity' as keyof Capacity
    },
    {
      icon: "bed",
      name: "Beds",
      value: "beds" as keyof Capacity
    },
    {
      icon: "single_bed",
      name: "IcuBeds",
      value: "icu_beds" as keyof Capacity
    }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IHospital,
    private dialogRef: MatDialogRef<Hospitaldialog>,
    private router: Router
  ) { }

  closeDialog() {
    this.dialogRef.close();
  }

  redirectTo(url: any[]) {
    this.router!.navigate(url)
    this.closeDialog()
  }
}
