import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Home } from '../../../home/services/home';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements OnInit {
  form!: FormGroup

  constructor(
    public fb: FormBuilder,
    private homeService: Home
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required]
    })
  }

  sendMessage() {
    this.homeService.contactUs(this.form.value)
      .subscribe((res) => {
        if (!res) {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Signup failed',
            confirmButtonText: 'OK'
          })
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Welcome back!',
            confirmButtonText: 'OK'
          })
        }
      })
  }
}
