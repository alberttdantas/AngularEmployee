import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Route[] = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component')
            .then(m => m.RegisterComponent)
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./pages/edit/edit.component')
            .then(m => m.EditComponent)
    },
    {
        path: 'details/:id',
        loadComponent: () => import('./pages/details/details.component')
            .then(m => m.DetailsComponent)
    }
];
