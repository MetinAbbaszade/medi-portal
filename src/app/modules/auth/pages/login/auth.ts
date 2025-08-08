import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorHandling } from '../../../../shared/components/error-handling/error-handling';

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
export class Auth implements OnInit {

  isSignupMode = false;
  passwordVisible = false;
  loginForm!: FormGroup;
  signupForm!: FormGroup;

  constructor(
    public fb: FormBuilder
  ) { }

  ngOnInit() {
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
    console.log(this.loginForm.value)
  }
}
