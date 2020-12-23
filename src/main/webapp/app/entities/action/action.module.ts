import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BikehouseordersSharedModule } from 'app/shared/shared.module';
import { ActionComponent } from './action.component';
import { ActionDetailComponent } from './action-detail.component';
import { ActionUpdateComponent } from './action-update.component';
import { ActionDeleteDialogComponent } from './action-delete-dialog.component';
import { actionRoute } from './action.route';

@NgModule({
  imports: [BikehouseordersSharedModule, RouterModule.forChild(actionRoute)],
  declarations: [ActionComponent, ActionDetailComponent, ActionUpdateComponent, ActionDeleteDialogComponent],
  exports: [],
  entryComponents: [ActionDeleteDialogComponent]
})
export class BikehouseordersActionModule {}
