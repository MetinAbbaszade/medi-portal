// auth.routes.ts (in auth folder)
import { Routes } from '@angular/router';

export const authRoutes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('./pages/login/auth').then(m => m.AuthComponent)
    }
];
