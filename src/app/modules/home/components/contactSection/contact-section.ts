import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TranslateService } from '@ngx-translate/core';
import { SharedTranslateModule } from '../../../../shared/modules/shared-translate.module';

@Component({
  selector: 'app-contact-section',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    SharedTranslateModule
  ],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.css'
})
export class ContactSection {
  public translate = inject(TranslateService)
  form!: FormGroup;
  aboutData = [
    {
      icon: 'location_on',
      label: 'addressLabel',
      value: 'addressValue'
    },
    {
      icon: 'call',
      label: 'phoneLabel',
      value: 'phoneValue'
    },
    {
      icon: 'message',
      label: 'emailLabel',
      value: 'emailValue'
    },
  ]

  constructor(
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.minLength(4), Validators.maxLength(10)]],
      email: ['', [Validators.email]],
      message: ['', [
        Validators.required
      ]]
    });
  }

  submitForm() {
    console.log(this.form.value)
  }

  get name() {
    return this.form.get('name');
  }
  get email() {
    return this.form.get('email');
  }

  get message() {
    return this.form.get('message')
  }

}
