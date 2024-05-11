export class MoveRecord {
  constructor(
    private _id: number,
    private _turnId: number,
    private _disc: number,
    private _x: number,
    private _y: number
  ) {}

  get disc() {
    return this._disc;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }
}
