import { Pipe, PipeTransform } from '@angular/core';
import { IAction } from 'app/shared/model/action.model';

@Pipe({
  name: 'actionsum',
  pure: false
})
export class ActionsumPipe implements PipeTransform {
  transform(actions: IAction[], ...args: string[]): number {
    return actions
      .map(action => {
        if (action.price !== undefined) {
          return action.price;
        } else {
          return 0;
        }
      })
      .reduce((a, b) => a + b);
  }
}
