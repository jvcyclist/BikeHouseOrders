import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IOrder, Order } from 'app/shared/model/order.model';
import { OrderService } from './order.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { Action, IAction } from 'app/shared/model/action.model';

@Component({
  selector: 'jhi-order-update',
  templateUrl: './order-update.component.html'
})
export class OrderUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  user!: IUser;
  userAuthorities: string[] = [];
  show = false;
  sum: number;
  isNew = false;
  actions: IAction[] = [
    {
      actionName: 'Wymiana przerzutki',
      price: 20.5
    },
    {
      actionName: 'Wymiana dętki',
      price: 32.6
    },
    {
      actionName: 'Centrowanie szprych',
      price: 15
    },
    {
      actionName: 'Dokręcenie korby',
      price: 22
    },
    {
      actionName: 'Regulacja przerzutki',
      price: 30.5
    }
  ];
  action: Action = new Action();

  editForm = this.fb.group({
    id: [],
    createdDate: [],
    bikeName: [null, [Validators.required]],
    phoneNumber: [null, [Validators.required]],
    startDate: [],
    comments: [],
    status: [],
    user: []
  });

  constructor(
    protected orderService: OrderService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.sum = this.actionPriceSum();
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ order }) => {
      if (!order.id) {
        this.isNew = true;
        const today = moment().startOf('day');
        order.createdDate = today;
        order.startDate = today;
      }

      this.updateForm(order);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
      this.userService.getCurrent().subscribe(currentUser => {
        this.user = currentUser;
        this.userAuthorities = this.user.authorities!;
      });
    });
  }

  updateForm(order: IOrder): void {
    this.editForm.patchValue({
      id: order.id,
      createdDate: order.createdDate ? order.createdDate.format(DATE_TIME_FORMAT) : null,
      bikeName: order.bikeName,
      phoneNumber: order.phoneNumber,
      startDate: order.startDate ? order.startDate.format(DATE_TIME_FORMAT) : null,
      comments: order.comments,
      status: order.status,
      user: order.user
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const order = this.createFromForm();
    if (order.id !== undefined) {
      this.subscribeToSaveResponse(this.orderService.update(order));
    } else {
      this.subscribeToSaveResponse(this.orderService.create(order));
    }
  }

  private createFromForm(): IOrder {
    return {
      ...new Order(),
      id: this.editForm.get(['id'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value
        ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      bikeName: this.editForm.get(['bikeName'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      startDate: this.editForm.get(['startDate'])!.value ? moment(this.editForm.get(['startDate'])!.value, DATE_TIME_FORMAT) : undefined,
      comments: this.editForm.get(['comments'])!.value,
      status: this.editForm.get(['status'])!.value,
      user: this.editForm.get(['user'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrder>>): void {
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

  trackById(index: number, item: IUser): any {
    return item.id;
  }

  saveAction(): void {
    this.actions.push(this.action);
    this.action = {};
    this.actionPriceSum();
  }

  actionPriceSum(): number {
    return (this.sum = this.actions
      .map(act => {
        if (act.price !== undefined) {
          return act.price;
        } else {
          return 0;
        }
      })
      .reduce((a, b) => a + b));
  }

  deleteAction(index: number): void {
    this.actions.splice(index, 1);
    this.actionPriceSum();
  }
}
