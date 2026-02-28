import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-doctor-detail-component',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    ɵInternalFormsSharedModule,
    MatSelectModule,
    CommonModule,
    TranslateModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './doctor-detail-component.html',
  styleUrl: './doctor-detail-component.css',
})

export class DoctorDetailComponent {
  isAddDialog: boolean = true;
  form!: FormGroup;

  protected Object = Object;

  @Input() element !: any;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      id: '',
      name: '',
      surname: '',
      gender: '',
      date_of_birth: '',
      email: '',
      number: '',
      adress: '',
      experience: '',
      picture: '',
      biography: '',
      status: ''
    })

    this.form.patchValue({ ...this.element });

    if (this.element) {
      this.isAddDialog = false;
    }
  }

  update() {
    console.log(this.form.getRawValue());
  }

  add() {
    console.log("add");
  }
}
