import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MainNavbar } from "./shared/components/main-navbar/main-navbar";
import { TranslateService } from '@ngx-translate/core';


@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatIconModule,
    MainNavbar
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(
    translate: TranslateService
  ) {
    console.log(translate.getBrowserLang())
  }
}
