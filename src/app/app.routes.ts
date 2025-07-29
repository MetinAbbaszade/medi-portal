import { Routes } from '@angular/router';
import { Main } from './modules/home/pages/main/main';

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
            }
        ]
    }
];
