import { Component } from '@angular/core';
import { Herocomponent } from "../../components/heroComponent/herocomponent";
import { AboutSection } from "../../components/aboutSection/about-section";
import { ContactSection } from "../../components/contactSection/contact-section";

@Component({
  selector: 'app-main',
  imports: [
    Herocomponent,
    AboutSection,
    ContactSection
],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {

}
