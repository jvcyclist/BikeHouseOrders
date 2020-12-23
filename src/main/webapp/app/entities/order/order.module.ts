import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BikehouseordersSharedModule } from 'app/shared/shared.module';
import { OrderComponent } from './order.component';
import { OrderDetailComponent } from './order-detail.component';
import { OrderUpdateComponent } from './order-update.component';
import { OrderDeleteDialogComponent } from './order-delete-dialog.component';
import { orderRoute } from './order.route';
import { MomentModule } from 'ngx-moment';
import { ActionsumPipe } from './actionsum.pipe';

@NgModule({
  imports: [BikehouseordersSharedModule, RouterModule.forChild(orderRoute), MomentModule],
  declarations: [OrderComponent, OrderDetailComponent, OrderUpdateComponent, OrderDeleteDialogComponent, ActionsumPipe],
  exports: [OrderComponent],
  entryComponents: [OrderDeleteDialogComponent]
})
export class BikehouseordersOrderModule {}
