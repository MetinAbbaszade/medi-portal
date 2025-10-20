import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(): boolean {
    const modules = this.authService.getUserModules()

    if (modules.includes('Admin')) {
      return true
    }

    this.router.navigate(['home'])
    return false
  }
}
