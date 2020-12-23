import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { DashboardComponent } from 'app/layouts/dashboard/dashboard.component';
import { HomeComponent } from 'app/home/home.component';

export const HOME_ROUTE: Route = {
  path: '',
  component: DashboardComponent,
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'home.title'
  },
  canActivate: [UserRouteAccessService]
};
