import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BikehouseordersTestModule } from '../../../test.module';
import { NeededPartDetailComponent } from 'app/entities/needed-part/needed-part-detail.component';
import { NeededPart } from 'app/shared/model/needed-part.model';

describe('Component Tests', () => {
  describe('NeededPart Management Detail Component', () => {
    let comp: NeededPartDetailComponent;
    let fixture: ComponentFixture<NeededPartDetailComponent>;
    const route = ({ data: of({ neededPart: new NeededPart(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BikehouseordersTestModule],
        declarations: [NeededPartDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(NeededPartDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NeededPartDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load neededPart on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.neededPart).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
