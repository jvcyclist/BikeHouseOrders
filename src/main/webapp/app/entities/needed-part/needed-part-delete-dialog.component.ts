import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INeededPart } from 'app/shared/model/needed-part.model';
import { NeededPartService } from './needed-part.service';

@Component({
  templateUrl: './needed-part-delete-dialog.component.html'
})
export class NeededPartDeleteDialogComponent {
  neededPart?: INeededPart;

  constructor(
    protected neededPartService: NeededPartService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.neededPartService.delete(id).subscribe(() => {
      this.eventManager.broadcast('neededPartListModification');
      this.activeModal.close();
    });
  }
}
