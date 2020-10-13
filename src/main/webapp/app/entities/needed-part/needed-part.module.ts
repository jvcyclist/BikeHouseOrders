import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BikehouseordersSharedModule } from 'app/shared/shared.module';
import { NeededPartComponent } from './needed-part.component';
import { NeededPartDetailComponent } from './needed-part-detail.component';
import { NeededPartUpdateComponent } from './needed-part-update.component';
import { NeededPartDeleteDialogComponent } from './needed-part-delete-dialog.component';
import { neededPartRoute } from './needed-part.route';

@NgModule({
  imports: [BikehouseordersSharedModule, RouterModule.forChild(neededPartRoute)],
  declarations: [NeededPartComponent, NeededPartDetailComponent, NeededPartUpdateComponent, NeededPartDeleteDialogComponent],
  exports: [NeededPartComponent],
  entryComponents: [NeededPartDeleteDialogComponent]
})
export class BikehouseordersNeededPartModule {}
