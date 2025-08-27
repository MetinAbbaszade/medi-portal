import { ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCard } from "@angular/material/card";
import { SharedTranslateModule } from '../../../../shared/modules/shared-translate.module';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-asistant',
  imports: [
    MatIconModule,
    MatCard,
    SharedTranslateModule,
    CommonModule
  ],
  templateUrl: './hero-asistant.html',
  styleUrl: './hero-asistant.css'
})
export class HeroAsistant {
  constructor(private cdRef: ChangeDetectorRef) { }
  // @ViewChild('messageContainer') private messageContainer!: ElementRef;
  public translate = inject(TranslateService);

  recommendations = [
    {
      icon: "psychology_alt",
      label: "recommendations"
    },
    {
      icon: "favorite",
      label: "favorites"
    },
    {
      icon: "star",
      label: "topRated"
    },
    {
      icon: "history",
      label: "recent"
    }
  ];


  messages: { text: string; sender: 'user' | 'bot' }[] = [
    {
      text: 'Hello! I am the MediPortal assistant. How can I help you?',
      sender: 'bot'
    }
  ];

  onSendMessage(message: string) {
    console.log("hello")
    this.messages.push({
      text: `Can you give me information about ${message}`,
      sender: 'user'
    })
    this.cdRef.detectChanges()
    // this.scrollToBottom();
    setTimeout(() => {
      this.messages.push({
        text: 'Hello',
        sender: 'bot'
      })
      this.cdRef.detectChanges()
      // this.scrollToBottom();
    }, 200);
  }

  // private scrollToBottom(): void {
  //   try {
  //     this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  //   } catch (err) { }
  // }
}
