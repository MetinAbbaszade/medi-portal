import { Routes } from '@angular/router';
import { Main } from './modules/home/pages/main/main';
import { Hospital } from './modules/hospital/pages/hospital/hospital';
import { Doctor } from './modules/doctors/pages/doctor/doctor';
import { About } from './modules/about/pages/about/about';
import { Contact } from './modules/contact/pages/contact/contact';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'auth/login'
    },
    {
        path: '',
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
                path: 'doctor',
                component: Doctor
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
    }
];
