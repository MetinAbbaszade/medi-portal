import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../../../../environments/environment';
import { map } from 'rxjs';
import { PatientUser } from '../models';

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

  login(credentials: any) {
    return this.http.post(this.baseUrl + '/login', credentials)
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
