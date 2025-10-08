import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [
    RouterLink,
    TranslateModule
  ],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {

  public translate = inject(TranslateService);
}
