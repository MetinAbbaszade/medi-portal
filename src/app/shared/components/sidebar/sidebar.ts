import { Component } from '@angular/core';
import { MainNavbar } from '../main-navbar/main-navbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SharedTranslateModule } from '../../modules/shared-translate.module';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-sidebar',
  imports: [
    MatSidenavModule,
    MatIconModule,
    RouterLink,
    SharedTranslateModule,
    MatToolbarModule,
    MatMenuModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar extends MainNavbar {

}
