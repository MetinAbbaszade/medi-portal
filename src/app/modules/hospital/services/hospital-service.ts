import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { url } from '../../../../environments/environment';
import { IRes } from '../modules/data';

interface IParams {
  searchData?: string;
  specialityId?: string;
  filter?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private url = url.baseUrl + 'api/hospital';

  constructor(private http: HttpClient) { }

  fetchHospitalData(params: IParams | {} = {}): Observable<IRes> {
    let httpParams = new HttpParams();

    Object.keys(params).forEach((key: string) => {
      const value = (params as any)[key];
      if (value) {
        httpParams = httpParams.set(key, value);
      }
    });

    return this.http.get<IRes>(this.url, { params: httpParams }).pipe(
      shareReplay(1)
    );
  }
}
