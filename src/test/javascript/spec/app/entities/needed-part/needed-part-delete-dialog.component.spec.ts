import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BikehouseordersTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { NeededPartDeleteDialogComponent } from 'app/entities/needed-part/needed-part-delete-dialog.component';
import { NeededPartService } from 'app/entities/needed-part/needed-part.service';

describe('Component Tests', () => {
  describe('NeededPart Management Delete Component', () => {
    let comp: NeededPartDeleteDialogComponent;
    let fixture: ComponentFixture<NeededPartDeleteDialogComponent>;
    let service: NeededPartService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BikehouseordersTestModule],
        declarations: [NeededPartDeleteDialogComponent]
      })
        .overrideTemplate(NeededPartDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NeededPartDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NeededPartService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
