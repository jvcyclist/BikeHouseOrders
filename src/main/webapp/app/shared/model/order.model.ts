import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IOrder {
  id?: number;
  createdDate?: Moment;
  bikeName?: string;
  phoneNumber?: string;
  startDate?: Moment;
  comments?: string;
  status?: Status;
  user?: IUser;
}

export class Order implements IOrder {
  constructor(
    public id?: number,
    public createdDate?: Moment,
    public bikeName?: string,
    public phoneNumber?: string,
    public startDate?: Moment,
    public comments?: string,
    public status?: Status,
    public user?: IUser
  ) {}
}
