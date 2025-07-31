import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedTranslateModule } from '../../../../shared/modules/shared-translate.module';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer-section',
  imports: [
    MatIconModule,
    SharedTranslateModule
  ],
  templateUrl: './footer-section.html',
  styleUrl: './footer-section.css'
})
export class FooterSection {

  public translate = inject(TranslateService)

  quickLinks = ['hospitals', 'doctors', 'about', 'contact', 'login'].map((data) => ({
    data
  }))

  services = ['bookAppointment', 'findDoctor', 'emergencyCare', 'insurance'].map((label) => ({label}))
}
