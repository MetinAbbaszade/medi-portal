import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
import { isObservable, Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TranslateModule } from '@ngx-translate/core';


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
    MatSelectModule,
    TranslateModule],
  templateUrl: './hospital.html',
  styleUrls: ['./hospital.css'],
  standalone: true
})
export class Hospital implements OnInit, OnDestroy {
  hospitals: IHospital[] = [];
  featuredHospitals: IHospital[] = [];
  searchResult: IHospital[] = [];
  filterForm!: FormGroup;
  public isMobile: boolean = false;
  private subscriptions = new Subscription();
  public translate = inject(TranslateModule)

  constructor(
    private hospitalService: HospitalService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.filterForm = this.fb.group({
      Name: [''],
      SpecialtyId: [''],
      Filter: ['']
    });


    this.fetchHospitals();
    this.loadFeaturedHospitals();

    this.subscriptions.add(
      this.filterForm.valueChanges.subscribe(value => this.fetchHospitals(value))
    );

    this.breakpointObserver
      .observe(['(max-width: 899px)'])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }

  private loadFeaturedHospitals(params = {}) {
    this.subscriptions.add(
      this.hospitalService.fetchHospitalData(params).subscribe(res => {
        this.featuredHospitals = res.filteredHospitals.slice(0, 3);
      })
    );
  }


  fetchHospitals(params: any = {}) {
    this.subscriptions.add(
      this.hospitalService.fetchHospitalData(params).subscribe(res => {
        this.hospitals = res.filteredHospitals;
        this.searchResult = params.Name ? res.filteredHospitals.slice(0, 3) : [];
      })
    );
  }

  viewDetails(item: IHospital) {
    const obj = !this.isMobile ? {
      minWidth: '40%'
    } : {
      minWidth: '98%'
    }

    this.dialog.open(Hospitaldialog as ComponentType<any>, {
      ...obj,
      height: '68%',
      data: item
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
