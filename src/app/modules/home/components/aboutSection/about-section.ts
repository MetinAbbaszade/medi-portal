import { Component, inject } from '@angular/core';
import { SharedTranslateModule } from '../../../../shared/modules/shared-translate.module';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-about-section',
  imports: [
    SharedTranslateModule,
    
  ],
  templateUrl: './about-section.html',
  styleUrl: './about-section.css'
})
export class AboutSection {
  public translate = inject(TranslateService)
}
