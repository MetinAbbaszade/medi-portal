import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCard } from "@angular/material/card";
import { SharedTranslateModule } from '../../../../shared/modules/shared-translate.module';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hero-asistant',
  imports: [
    MatIconModule,
    MatCard,
    SharedTranslateModule
  ],
  templateUrl: './hero-asistant.html',
  styleUrl: './hero-asistant.css'
})
export class HeroAsistant {
  public translate = inject(TranslateService)
}
