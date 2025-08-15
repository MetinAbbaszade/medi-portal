import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IHospital } from '../../modules/data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hospitaldialog',
  imports: [
    CommonModule
  ],
  templateUrl: './hospitaldialog.html',
  styleUrl: './hospitaldialog.css'
})
export class Hospitaldialog {

  hospitalInfo = [
    {
      icon: "calendar_today",
      name: "Established",
      value: "1896"
    },
    {
      icon: "bed",
      name: "Beds",
      value: "450"
    },
    {
      icon: "settings_phone",
      name: "Contact",
      value: "+39 06 123 4567"
    }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IHospital,
    private dialogRef: MatDialogRef<Hospitaldialog>
  ) { }

  ngOnInit() { }

  closeDialog() {
    this.dialogRef.close();
  }
}
