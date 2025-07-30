import { Component } from '@angular/core';
import { Herocomponent } from "../../components/heroComponent/herocomponent";

@Component({
  selector: 'app-main',
  imports: [Herocomponent],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {

}
