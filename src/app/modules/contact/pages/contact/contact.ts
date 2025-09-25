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
        this.form.reset();
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Applied successfully!',
          confirmButtonText: 'OK'
        })
      }, (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Can not apply',
          confirmButtonText: 'OK'
        })
      })
  }
}
