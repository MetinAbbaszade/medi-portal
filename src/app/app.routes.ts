import { Routes } from '@angular/router';
import { Main } from './modules/home/pages/main/main';
import { Hospital } from './modules/hospital/pages/hospital/hospital';
import { About } from './modules/about/pages/about/about';
import { Contact } from './modules/contact/pages/contact/contact';
import { AuthGuard } from './auth.guard';
import { Pagenotfoundcomponent } from './shared/components/pagenotfound/pagenotfoundcomponent';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
        data: { breadcrumb: 'mediPortal' }
    },
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'home',
                component: Main
            },
            {
                path: 'hospital',
                component: Hospital
            },
            {
                path: 'about',
                component: About
            },
            {
                path: 'contact',
                component: Contact
            },
            {
                path: 'auth',
                loadChildren: () =>
                    import('./modules/auth/auth.routes').then(m => m.authRoutes)
            }
        ]
    },
    {
        path: '**',
        component: Pagenotfoundcomponent
    }
];
