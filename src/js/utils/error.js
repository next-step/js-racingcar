// eslint-disable-next-line max-classes-per-file
export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

export class NotAllowedError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotAllowedError";
  }
}
