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
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-hospital',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, MatIconModule, MatFormFieldModule,
    FormsModule, MatInputModule, MatDividerModule, MatButtonModule, MatExpansionModule, MatSelectModule],
  templateUrl: './hospital.html',
  styleUrls: ['./hospital.css'],
  standalone: true
})
export class Hospital {
  featuredHospitals: IHospital[] | null = null;
  searchResult: any;
  filterForm!: FormGroup;
  filteredHospitals$!: Observable<IHospital[]>;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private HospitalService: HospitalService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.searchResult = [];
    this.fetchData();

    this.filterForm = this.fb.group({
      Name: [''],
      SpecialtyId: [''],
      Filter: ['']
    })

    this.filterForm.valueChanges.subscribe(
      value => {
        this.fetchData(value)
      }
    )

  }

  fetchData(params = {}) {
    this.subscriptions.add(
      this.HospitalService.fetchHospitalData(params).subscribe(res => {
        this.featuredHospitals = res.filteredHospitals;
      })
    );
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

