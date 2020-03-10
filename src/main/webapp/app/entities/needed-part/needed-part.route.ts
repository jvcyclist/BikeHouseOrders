import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INeededPart, NeededPart } from 'app/shared/model/needed-part.model';
import { NeededPartService } from './needed-part.service';
import { NeededPartComponent } from './needed-part.component';
import { NeededPartDetailComponent } from './needed-part-detail.component';
import { NeededPartUpdateComponent } from './needed-part-update.component';

@Injectable({ providedIn: 'root' })
export class NeededPartResolve implements Resolve<INeededPart> {
  constructor(private service: NeededPartService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INeededPart> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((neededPart: HttpResponse<NeededPart>) => {
          if (neededPart.body) {
            return of(neededPart.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NeededPart());
  }
}

export const neededPartRoute: Routes = [
  {
    path: '',
    component: NeededPartComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'bikehouseordersApp.neededPart.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NeededPartDetailComponent,
    resolve: {
      neededPart: NeededPartResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'bikehouseordersApp.neededPart.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NeededPartUpdateComponent,
    resolve: {
      neededPart: NeededPartResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'bikehouseordersApp.neededPart.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NeededPartUpdateComponent,
    resolve: {
      neededPart: NeededPartResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'bikehouseordersApp.neededPart.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
