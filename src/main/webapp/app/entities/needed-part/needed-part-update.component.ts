import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { INeededPart, NeededPart } from 'app/shared/model/needed-part.model';
import { NeededPartService } from './needed-part.service';

@Component({
  selector: 'jhi-needed-part-update',
  templateUrl: './needed-part-update.component.html'
})
export class NeededPartUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(2)]]
  });

  constructor(protected neededPartService: NeededPartService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ neededPart }) => {
      this.updateForm(neededPart);
    });
  }

  updateForm(neededPart: INeededPart): void {
    this.editForm.patchValue({
      id: neededPart.id,
      name: neededPart.name
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const neededPart = this.createFromForm();
    if (neededPart.id !== undefined) {
      this.subscribeToSaveResponse(this.neededPartService.update(neededPart));
    } else {
      this.subscribeToSaveResponse(this.neededPartService.create(neededPart));
    }
  }

  private createFromForm(): INeededPart {
    return {
      ...new NeededPart(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INeededPart>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
