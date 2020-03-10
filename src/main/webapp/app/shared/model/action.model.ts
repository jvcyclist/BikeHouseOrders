import { IOrder } from 'app/shared/model/order.model';

export interface IAction {
  id?: number;
  actionName?: string;
  price?: number;
  order?: IOrder;
}

export class Action implements IAction {
  constructor(public id?: number, public actionName?: string, public price?: number, public order?: IOrder) {}
}
