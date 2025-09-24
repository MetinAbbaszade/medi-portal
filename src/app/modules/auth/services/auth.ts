import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../../../../environments/environment';
import { map, Observable, reduce } from 'rxjs';
import { PatientUser } from '../models';
import { IResponse } from '../pages/login/auth';

export interface IArray {
  email: string, password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = url.baseUrl + "api/auth"
  constructor(
    private http: HttpClient
  ) { }

  login(credentials: any): Observable<IResponse> {
    const headers = new HttpHeaders({
      'authorization-method': 'true'
    });

    return this.http.post<IResponse>(
      `${this.baseUrl}/login`,
      credentials,
      { headers }
    );
  }

  register(credentials: any): Observable<IResponse> {
    const headers = new HttpHeaders({
      'authorization-method': 'true'
    });

    return this.http.post<IResponse>(
      `${this.baseUrl}/register`,
      credentials,
      { headers }
    );
  }
}
