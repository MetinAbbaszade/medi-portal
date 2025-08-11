import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
    ErrorHandling
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class AuthComponent implements OnInit {

  isSignupMode = false;
  passwordVisible = false;
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  redirectTo: any;

  constructor(
    public fb: FormBuilder,
    private Translation: Translation,
    private AuthService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const redirectTo = this.activatedRoute.snapshot.queryParamMap.get('redirectTo')
    this.redirectTo = redirectTo || '/'
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    })

    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
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
    this.AuthService.fetchDatas(this.loginForm.value)
      .subscribe(
        (res) => {
          if (res.length === 0) {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Email or Password is incorrect',
              confirmButtonText: 'OK'
            });
            this.loginForm.reset()
          } else {
            localStorage.setItem('token', JSON.stringify(res[0]))
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
    console.log(this.signupForm.value);
  }

  changeLang(lang: string) {
    this.Translation.setLang(lang);
  }
}
