export class Task {
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get status(): TaskStatus {
    return this._status;
  }

  set status(value: TaskStatus) {
    this._status = value;
  }

  constructor(
    private _id: string,
    private _title: string,
    private _description: string,
    private _status: TaskStatus
  ) {
  }
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}
