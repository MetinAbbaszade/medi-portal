import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { url } from '../../../../environments/environment';
import { IRes } from '../modules/data';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private url = url.baseUrl + 'api/hospital';
  private allHospitals$: Observable<IRes>;

  constructor(private http: HttpClient) {
    this.allHospitals$ = this.http.get<IRes>(this.url).pipe(
      shareReplay(1)
    );
  }

  fetchHospitalData(): Observable<IRes> {
    return this.allHospitals$;
  }
}
