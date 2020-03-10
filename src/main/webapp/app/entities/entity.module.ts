import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'action',
        loadChildren: () => import('./action/action.module').then(m => m.BikehouseordersActionModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./order/order.module').then(m => m.BikehouseordersOrderModule)
      },
      {
        path: 'needed-part',
        loadChildren: () => import('./needed-part/needed-part.module').then(m => m.BikehouseordersNeededPartModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class BikehouseordersEntityModule {}
