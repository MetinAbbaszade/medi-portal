import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagenotfoundcomponent',
  imports: [],
  templateUrl: './pagenotfoundcomponent.html',
  styleUrl: './pagenotfoundcomponent.css'
})
export class Pagenotfoundcomponent {
  constructor(private router: Router) { }

  goHome() {
    this.router.navigate(['/home']);
  }
}
