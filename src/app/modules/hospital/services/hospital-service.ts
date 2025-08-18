import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { url } from '../../../../environments/environment';
import { IHospital } from '../modules/data';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  private baseUrl = url.baseUrl + "hospitals";
  private allHospitals$: Observable<IHospital[]>;

  constructor(private http: HttpClient) {
    this.allHospitals$ = this.http.get<IHospital[]>(this.baseUrl).pipe(
      shareReplay(1)
    );
  }
  
  fetchHospitalData(): Observable<IHospital[]> {
    return this.allHospitals$;
  }
}