import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-detail-component',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    TranslateModule,
    MatExpansionModule
  ],
  templateUrl: './detail-component.html',
  styleUrl: './detail-component.css',
})
export class DetailComponent implements OnInit {

  @Input() element: any;
  form!: FormGroup;

  constructor(
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      id: [''],
      name: [''],
      type: [''],
      description: [''],
      contacts: this.fb.array([
        this.fb.group({
          phone: [''],
          email: [''],
          website: ['']
        })
      ]),
      capacities: this.fb.array([
        this.fb.group({
          beds: [''],
          icu_beds: [''],
          emergency_capacity: ['']
        })
      ]),
      adresses: this.fb.array([
        this.fb.group({
          street: [''],
          city: [''],
          state: [''],
          zip: [''],
          county: ['']
        })
      ])
    });

    this.form.patchValue({ ...this.element });
  }

  get contactsFA(): FormArray {
    return this.form.get('contacts') as FormArray;
  }

  get capacitiesFA(): FormArray {
    return this.form.get('capacities') as FormArray;
  }

  get adressesFA(): FormArray {
    return this.form.get('adresses') as FormArray;
  }

}
