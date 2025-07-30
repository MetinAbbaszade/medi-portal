import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'

@Component({
  selector: 'app-contact-section',
  imports: [
    MatIconModule,
    MatFormFieldModule
  ],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.css'
})
export class ContactSection {

}
