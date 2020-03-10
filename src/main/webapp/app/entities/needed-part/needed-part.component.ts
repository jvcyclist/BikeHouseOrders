import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INeededPart } from 'app/shared/model/needed-part.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { NeededPartService } from './needed-part.service';
import { NeededPartDeleteDialogComponent } from './needed-part-delete-dialog.component';

@Component({
  selector: 'jhi-needed-part',
  templateUrl: './needed-part.component.html'
})
export class NeededPartComponent implements OnInit, OnDestroy {
  neededParts: INeededPart[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected neededPartService: NeededPartService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.neededParts = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.neededPartService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<INeededPart[]>) => this.paginateNeededParts(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.neededParts = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNeededParts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INeededPart): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNeededParts(): void {
    this.eventSubscriber = this.eventManager.subscribe('neededPartListModification', () => this.reset());
  }

  delete(neededPart: INeededPart): void {
    const modalRef = this.modalService.open(NeededPartDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.neededPart = neededPart;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateNeededParts(data: INeededPart[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.neededParts.push(data[i]);
      }
    }
  }
}
