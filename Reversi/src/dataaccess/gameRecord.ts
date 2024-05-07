export class GameRecord {
  constructor(private _id: number, private _startedAt: Date) {}

  get id() {
    return this._id;
  }
}
