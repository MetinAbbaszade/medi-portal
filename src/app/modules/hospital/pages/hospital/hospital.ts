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
import { combineLatest, debounceTime, distinctUntilChanged, filter, Observable, startWith, Subscription, switchMap } from 'rxjs';


@Component({
  selector: 'app-hospital',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, MatIconModule, MatFormFieldModule,
    FormsModule, MatInputModule, MatDividerModule, MatButtonModule, MatExpansionModule, MatSelectModule],
  templateUrl: './hospital.html',
  styleUrl: './hospital.css',
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
      searchData: [''],
      speciality: [''],
      filter: ['']
    })

    this.filteredHospitals$ = combineLatest([
      this.filterForm.valueChanges.pipe(
        startWith(this.filterForm.value),
        debounceTime(300),
        distinctUntilChanged()
      ),
      this.HospitalService.fetchHospitalData()
    ]).pipe(
      switchMap(([filters, allHospitals]) => {
        let filtered = [...allHospitals];

        if (filters.searchData) {
          filtered = filtered.filter(hospital =>
            hospital.name.toLowerCase().includes(filters.searchData.toLowerCase())
          );
        }

        if (filters.speciality) {
          filtered = filtered.filter(hospital =>
            hospital.specialties.includes(filters.speciality)
          );
        }

        if (filters.filter) {
          filtered.sort((a, b) => {
            if (filters.filter === 'name-asc') {
              return a.name.localeCompare(b.name);
            } else {
              return b.name.localeCompare(a.name);
            }
          });
        }
        return [filtered];
      })
    );

    this.subscriptions.add(
      this.filteredHospitals$.subscribe(hospitals => {
        const searchTerm = this.filterForm.get('searchData')?.value;
        this.searchResult = searchTerm ? hospitals : [];
      })
    );
  }

  fetchData() {
    this.subscriptions.add(
      this.HospitalService.fetchHospitalData().subscribe(res => {
        this.featuredHospitals = res.slice(0, 3);
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

