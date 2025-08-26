import { Routes } from '@angular/router';
import { Main } from './modules/home/pages/main/main';
import { Hospital } from './modules/hospital/pages/hospital/hospital';
import { About } from './modules/about/pages/about/about';
import { Contact } from './modules/contact/pages/contact/contact';
import { AuthGuard } from './auth.guard';
import { Pagenotfoundcomponent } from './shared/components/pagenotfound/pagenotfoundcomponent';
import { Profilecomponent } from './modules/profile/pages/profilecomponent/profilecomponent';
import { Hospitaldetails } from './modules/hospital-details/pages/hospitaldetails/hospitaldetails';
import { BookAppointment } from './modules/bookAppointment/pages/bookAppointment/book-appointment';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'hospital',
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
            },
            {
                path: 'profile',
                component: Profilecomponent
            },
            {
                path: 'hospital-details',
                component: Hospitaldetails
            },
            {
                path: 'book-appointment',
                component: BookAppointment
            },
            {
                path: 'page-not-found',
                component: Pagenotfoundcomponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'page-not-found'
    }
];
