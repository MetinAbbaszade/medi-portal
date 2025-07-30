import { Component } from '@angular/core';
import { Herocomponent } from "../../components/heroComponent/herocomponent";
import { AboutSection } from "../../components/aboutSection/about-section";

@Component({
  selector: 'app-main',
  imports: [
    Herocomponent,
    AboutSection
  ],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {

}
