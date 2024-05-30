type ApplicationErrorType = "LatestGameNotFound";

export class ApplicationError extends Error {
  constructor(private _type: ApplicationErrorType, message: string) {
    super(message);
  }

  get type() {
    return this._type;
  }
}
