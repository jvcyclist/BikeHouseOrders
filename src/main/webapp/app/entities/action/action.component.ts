import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAction } from 'app/shared/model/action.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ActionService } from './action.service';
import { ActionDeleteDialogComponent } from './action-delete-dialog.component';

@Component({
  selector: 'jhi-action',
  templateUrl: './action.component.html'
})
export class ActionComponent implements OnInit, OnDestroy {
  actions: IAction[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected actionService: ActionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.actions = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.actionService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IAction[]>) => this.paginateActions(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.actions = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInActions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAction): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInActions(): void {
    this.eventSubscriber = this.eventManager.subscribe('actionListModification', () => this.reset());
  }

  delete(action: IAction): void {
    const modalRef = this.modalService.open(ActionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.action = action;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateActions(data: IAction[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.actions.push(data[i]);
      }
    }
  }
}
