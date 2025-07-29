import { Routes } from '@angular/router';
import { Main } from './modules/home/pages/main/main';
import { Hospital } from './modules/hospital/pages/hospital/hospital';
import { Doctor } from './modules/doctors/pages/doctor/doctor';
import { About } from './modules/about/pages/about/about';
import { Contact } from './modules/contact/pages/contact/contact';
import { Auth } from './modules/auth/pages/login/auth';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
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
                component: Auth
            }
        ]
    }
];
