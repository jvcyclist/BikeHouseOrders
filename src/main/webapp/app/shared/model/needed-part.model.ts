export interface INeededPart {
  id?: number;
  name?: string;
}

export class NeededPart implements INeededPart {
  constructor(public id?: number, public name?: string) {}
}
