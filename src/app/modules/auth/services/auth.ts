import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../../../../environments/environment';
import { map } from 'rxjs';

interface IArray {
  email: string, password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = url.baseUrl
  constructor(
    private http: HttpClient
  ) { }

  fetchDatas(credentials: IArray) {
    return this.http.get<IArray[]>(this.baseUrl).pipe(
      map((res: IArray[]) =>
        res.filter((data: IArray) => data.email === credentials.email && data.password === credentials.password)
      )
    );
  }
}
