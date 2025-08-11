import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const { url } = state;

        const isAuthenticated = !!localStorage.getItem('token');
        if (!url.includes('/auth/login') && !isAuthenticated) {
            this.router.navigate(['/auth/login'], { queryParams: { redirectTo: url } });
            return false;
        }

        if (url.includes('login') && localStorage.getItem('token')) {
            this.router.navigateByUrl('/home')
            return true;
        }

        return true;

    }
}