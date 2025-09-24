import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { url } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

export interface IContactPayload {
  id?: string
  name: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class Home {

  baseUrl = url.baseUrl + 'api';

  constructor(
    private http: HttpClient
  ) { }

  contactUs(payload: IContactPayload) {
    return this.http.post(this.baseUrl + '/contact', payload)
  }

}
