import { Injectable } from '@angular/core';
import { url } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

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
}
