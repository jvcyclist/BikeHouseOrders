import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INeededPart } from 'app/shared/model/needed-part.model';

@Component({
  selector: 'jhi-needed-part-detail',
  templateUrl: './needed-part-detail.component.html'
})
export class NeededPartDetailComponent implements OnInit {
  neededPart: INeededPart | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ neededPart }) => (this.neededPart = neededPart));
  }

  previousState(): void {
    window.history.back();
  }
}
