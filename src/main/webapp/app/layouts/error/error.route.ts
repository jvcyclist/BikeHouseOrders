import { Routes } from '@angular/router';

import { ErrorComponent } from './error.component';
import { HomeComponent } from 'app/home/home.component';

export const errorRoute: Routes = [
  {
    path: 'error',
    component: ErrorComponent,
    data: {
      authorities: [],
      pageTitle: 'error.title'
    }
  },
  {
    path: 'accessdenied',
    component: ErrorComponent,
    data: {
      authorities: [],
      pageTitle: 'error.title',
      errorMessage: 'error.http.403'
    }
  },
  {
    path: '404',
    component: ErrorComponent,
    data: {
      authorities: [],
      pageTitle: 'error.title',
      errorMessage: 'error.http.404'
    }
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];
