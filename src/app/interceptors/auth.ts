import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { catchError, concatMap, map, throwError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (req.headers.get('authorization-method') === 'true') {
        return next(req);
    }

    return auth.token$.pipe(
        map(token => req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })),
        concatMap(authReq => next(authReq)),
        catchError((error: any) => {
            console.error('failed with error:', error);

            if (error.error === 'You do not have an access to this module') {
                router.navigate(['/']);
            }

            return throwError(() => error);
        })
    );
};
