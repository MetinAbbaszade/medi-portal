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
    return this.http.get(`${this.BASE_URL}specialties`);
  }

  getDepartments() {
    return this.http.get(`${this.BASE_URL}departments`);
  }
}
