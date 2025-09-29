import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth.service';
import { PatientUser } from '../../../auth/models';
import { authInterceptor } from '../../../../interceptors/auth'

@Component({
  selector: 'app-profilecomponent',
  templateUrl: './profilecomponent.html',
  styleUrl: './profilecomponent.css',
})
export class Profilecomponent implements OnInit {

  token!: PatientUser | null;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.token = this.authService.decodedToken;
  }
}
