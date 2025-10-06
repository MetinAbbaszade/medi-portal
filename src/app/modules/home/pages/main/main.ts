import { Component } from '@angular/core';
import { Herocomponent } from "../../components/heroComponent/herocomponent";
import { AboutSection } from "../../components/aboutSection/about-section";
import { ContactSection } from "../../components/contactSection/contact-section";
import { FooterSection } from "../../components/footerSection/footer-section";

@Component({
  selector: 'app-main',
  imports: [
    Herocomponent,
    AboutSection,
    ContactSection,
    FooterSection
  ],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {

}
