import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BikehouseordersTestModule } from '../../../test.module';
import { NeededPartUpdateComponent } from 'app/entities/needed-part/needed-part-update.component';
import { NeededPartService } from 'app/entities/needed-part/needed-part.service';
import { NeededPart } from 'app/shared/model/needed-part.model';

describe('Component Tests', () => {
  describe('NeededPart Management Update Component', () => {
    let comp: NeededPartUpdateComponent;
    let fixture: ComponentFixture<NeededPartUpdateComponent>;
    let service: NeededPartService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BikehouseordersTestModule],
        declarations: [NeededPartUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(NeededPartUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NeededPartUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NeededPartService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NeededPart(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new NeededPart();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
