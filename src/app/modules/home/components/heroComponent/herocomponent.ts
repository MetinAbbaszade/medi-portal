import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';       // Optional: if you plan to add buttons
import { MatIconModule } from '@angular/material/icon';           // Optional: if you use icons
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeroAsistant } from "../heroAsistant/hero-asistant";     // Optional: for header or layout
import { TranslateService } from '@ngx-translate/core';
import { SharedTranslateModule } from '../../../../shared/modules/shared-translate.module';


@Component({
  selector: 'app-herocomponent',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    HeroAsistant,
    SharedTranslateModule,
  ],
  templateUrl: './herocomponent.html',
  styleUrl: './herocomponent.css'
})
export class Herocomponent {
  public translate = inject(TranslateService);
  constructor(
  ) { }
}
