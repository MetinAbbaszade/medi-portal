import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import menuLinks from '../../modules/menu-links';
import { PermittedIfDirective } from "../../../../directives/permitted-if.directive";
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from "@angular/material/expansion";
import { Router, RouterLink, RouterOutlet } from '@angular/router';

type MenuLinkKey = keyof typeof menuLinks;

interface Appointment {
  patientName: string;
  date: string;
  time: string;
  type: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface Notification {
  message: string;
  time: string;
}

@Component({
  selector: 'app-profilecomponent',
  imports: [
    TranslateModule,
    CommonModule,
    PermittedIfDirective,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './profilecomponent.html',
  styleUrl: './profilecomponent.css',
})
export class Profilecomponent implements OnInit {
  token: any;
  appointments: Appointment[] = [];
  notifications: Notification[] = [];
  links!: Array<any>;
  ActiveRoute: string | undefined = '';
  public translate = inject(TranslateModule)

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.token = this.authService.decodedToken;

    this.links = this.authService.getUserModules()
      .map(module => {
        return menuLinks[module as MenuLinkKey]
      })
      .filter(m => m)
      .sort((a, b) => b.label.localeCompare(a.label))

    this.ActiveRoute = this.router.url.slice(9);
  }

  isActiveParent(link: any): boolean {
    if (!link?.children) return false;
    return this.hasActiveChild(link.children);
  }

  private hasActiveChild(children: any[]): boolean {
    for (const child of children) {
      if (child.link && this.ActiveRoute!.includes(child.link)) {
        return true;
      }
      if (child.children && this.hasActiveChild(child.children)) {
        return true;
      }
    }
    return false;
  }
}
