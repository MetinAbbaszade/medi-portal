import { HttpClient } from '@angular/common/http';
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
    return this.http.post<IResponse>(this.baseUrl + '/login', credentials)
  }

  register(credentials: any): Observable<IResponse> {
    return this.http.post<IResponse>(this.baseUrl + '/register', credentials);
  }

  fetchDatas(credentials: IArray) {
    return this.http.get<IArray[]>(this.baseUrl).pipe(
      map((res: IArray[]) =>
        res.filter((data: IArray) => data.email === credentials.email && data.password === credentials.password)
      )
    );
  }

  fetchAllDatas() {
    return this.http.get<IArray[]>(this.baseUrl)
  }

  postData(data: PatientUser) {
    return this.http.post<IArray[]>(this.baseUrl, data)
  }
}
