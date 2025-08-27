import { Component, Input } from '@angular/core';
import menuLinks from './menu-links';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from "@angular/material/expansion";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-menu',
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButton,
    RouterLink,
    RouterLinkActive,
    MatIcon
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

  @Input() closeBtnEvent!: () => void
  links!: Array<any>;

  constructor() {
    this.links = Object.values(menuLinks)
  }


}
