import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorHandling } from '../../../../shared/components/error-handling/error-handling';
import { Translation } from '../../../../translation';
import { AuthService } from '../../services/auth';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export interface IResponse {
  token: string
}

@Component({
  selector: 'app-auth',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    ErrorHandling,
    TranslateModule
  ],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css'],
})
export class AuthComponent implements OnInit {

  isSignupMode = false;
  passwordVisible = false;
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  redirectTo: any;
  public translate = inject(TranslateService);

  constructor(
    public fb: FormBuilder,
    public Translation: Translation,
    private AuthService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.redirectTo = this.activatedRoute.snapshot.queryParamMap.get('redirectTo') || '/';
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    })

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  toggle() {
    this.isSignupMode = !this.isSignupMode;
  }

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  login() {
    this.AuthService.login(this.loginForm.value)
      .subscribe(
        (res: IResponse) => {
          if (!res) {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Email or Password is incorrect',
              confirmButtonText: 'OK'
            });
            this.loginForm.reset()
          } else {
            localStorage.setItem('token', res.token)
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Welcome back!',
              confirmButtonText: 'OK'
            })
            this.router.navigate([this.redirectTo]);
          }
        }
      )
  }

  signUp() {
    this.AuthService.register(this.signupForm.value)
      .subscribe(
        (res: IResponse) => {
          if (!res) {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Signup failed',
              confirmButtonText: 'OK'
            })
          } else {
            localStorage.setItem('token', res.token)
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Welcome back!',
              confirmButtonText: 'OK'
            })
            this.router.navigate([this.redirectTo]);
          }
        }
      )
  }

  changeLang(lang: string) {
    this.Translation.setLang(lang);
  }
}
