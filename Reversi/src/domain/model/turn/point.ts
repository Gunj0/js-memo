import { DomainError } from "../../error/domainError";

const MIN_POINT = 0;
const MAX_POINT = 7;

export class Point {
  constructor(private _x: number, private _y: number) {
    if (_x < MIN_POINT || MAX_POINT < _x || _y < MIN_POINT || MAX_POINT < _y) {
      throw new DomainError("InvalidPoint", "Invalid point");
    }
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }
}
