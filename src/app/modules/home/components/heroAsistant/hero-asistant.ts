import {
  AfterViewInit,
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  inject
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCard } from "@angular/material/card";
import { SharedTranslateModule } from '../../../../shared/modules/shared-translate.module';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-asistant',
  standalone: true,
  imports: [MatIconModule, MatCard, SharedTranslateModule, CommonModule],
  templateUrl: './hero-asistant.html',
  styleUrls: ['./hero-asistant.css']
})
export class HeroAsistant implements AfterViewInit {
  constructor(private cdRef: ChangeDetectorRef) { }
  public translate = inject(TranslateService);
  loading: boolean = false;

  @ViewChild('messageContainer') private messageContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('bottom') private bottom!: ElementRef<HTMLDivElement>;

  recommendations = [
    { icon: "psychology_alt", label: "recommendations" },
    { icon: "favorite", label: "favorites" },
    { icon: "star", label: "topRated" },
    { icon: "history", label: "recent" }
  ];

  messages: { text: string; sender: 'user' | 'bot' }[] = [
    { text: 'Hello! I am the MediPortal assistant. How can I help you?', sender: 'bot' }
  ];


  ngAfterViewInit() {
    this.scrollToBottom(false);
  }


  onSendMessage(message: string) {
    this.messages.push({ text: `Can you give me information about ${message}`, sender: 'user' });
    this.loading = true;
    this.handleChange();

    setTimeout(() => {
      this.messages.push({ text: 'Here is some info about ' + message, sender: 'bot' });
      this.handleChange();
      this.loading = false;
    }, 3000);
  }

  trackByIndex(i: number) { return i; }

  private scrollToBottom(smooth = true) {
    try {
      this.bottom?.nativeElement.scrollIntoView({
        behavior: smooth ? 'smooth' : 'auto',
        block: 'end'
      });
    } catch { }
  }

  handleChange() {
    this.cdRef.detectChanges();
    this.scrollToBottom();
  }
}
