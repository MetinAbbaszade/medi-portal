import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { AdminServices } from '../../services/admin-services';
import Swal from 'sweetalert2';

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
  @Output() refresh = new EventEmitter<any>();

  form!: FormGroup;
  isAddDialog: boolean = false;
  departments!: any[];
  specialties!: any[];

  private initial: any;

  constructor(
    public fb: FormBuilder,
    private service: AdminServices,
  ) { }

  ngOnInit(): void {

    this.service.getDepartments().subscribe(({ departments }) => this.departments = departments);
    this.service.getAllSpecialties().subscribe(({ specialties }) => this.specialties = specialties);

    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      contacts: this.fb.array([
        this.fb.group({
          phone: ['', Validators.required],
          email: ['', Validators.required],
          website: ['', Validators.required]
        })
      ]),
      capacities: this.fb.array([
        this.fb.group({
          beds: ['', Validators.required],
          icu_beds: ['', Validators.required],
          emergency_capacity: ['', Validators.required]
        })
      ]),
      adresses: this.fb.array([
        this.fb.group({
          street: ['', Validators.required],
          city: ['', Validators.required],
          state: ['', Validators.required],
          zip: ['', Validators.required],
          country: ['', Validators.required]
        })
      ])
    });

    if (!this.element) {
      this.isAddDialog = true;
      this.form.addControl('image', new FormControl(
        'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb'
      ));
      this.form.addControl('departments', new FormControl('', Validators.required));
      this.form.addControl('specialties', new FormControl('', Validators.required));
    }

    this.form.patchValue({ ...this.element });

    this.initial = this.form.getRawValue();

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

  update() {
    this.service.updateHospitals(this.form.get('id')?.value, { ...this.form.value })
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Successfully Updated',
            text: `Hospital with ${this.form.get('id')?.value} updated`,
            confirmButtonText: 'OK',
          }).then(() => {
            this.initial = this.form.getRawValue();
            this.refresh.emit();
          });
        },
        error: ({ error }) => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: error.message,
            confirmButtonText: 'OK',
          });
        }
      })
  }

  get hasRealChanges(): boolean {
    return JSON.stringify(this.form.getRawValue()) !== JSON.stringify(this.initial);
  }

  add() {
    const payload = this.form.value;
    delete payload.id;

    console.log(payload);
  }

}
