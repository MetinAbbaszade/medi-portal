import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth.service';
import { PatientUser } from '../../../auth/models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  imports: [
    TranslateModule,
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  token!: PatientUser | null;
  public translate = inject(TranslateModule)

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit() {
    this.token = this.authService.decodedToken
  }
}
