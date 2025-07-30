import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';       // Optional: if you plan to add buttons
import { MatIconModule } from '@angular/material/icon';           // Optional: if you use icons
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeroAsistant } from "../heroAsistant/hero-asistant";     // Optional: for header or layout


@Component({
  selector: 'app-herocomponent',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    HeroAsistant
],
  templateUrl: './herocomponent.html',
  styleUrl: './herocomponent.css'
})
export class Herocomponent {

}
