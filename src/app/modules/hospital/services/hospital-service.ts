import { Injectable } from '@angular/core';
import { url } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { filter, finalize, map } from 'rxjs';
import { IHospital } from '../modules/data';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = url.baseUrl + "hospitals"

  fetchHospitalData() {
    return this.http.get(this.baseUrl)
  }

  filterData(filterData: any) {
    const data = this.http.get<IHospital[]>(this.baseUrl)
      .pipe(
        map(
          (res: IHospital[]) => res.filter((data: IHospital) => !data.name.toLowerCase().indexOf(filterData))
        )
      )
    console.log(data);
    return data;
  }
}
