import { Injectable } from '@angular/core';
import { url } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminServices {

  BASE_URL = url.baseUrl + 'api/'

  constructor(
    private http: HttpClient
  ) { }

  getAllSpecialties() {
    return this.http.get<{ specialties: any }>(`${this.BASE_URL}specialties`);
  }

  getDepartments() {
    return this.http.get<{ departments: any }>(`${this.BASE_URL}departments`);
  }

  updateHospitals(id: string, body: any) {
    return this.http.put(`${this.BASE_URL}hospital/${id}`, body);
  }

  addHospital(body: any) {
    return this.http.post(`${this.BASE_URL}hospital`, body);
  }
}
