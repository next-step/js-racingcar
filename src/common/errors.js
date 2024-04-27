export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

export class TypeError extends Error {
  constructor(message) {
    super(message);
    this.name = "TypeError";
  }
}

export class ArgumentError extends Error {
  constructor(message) {
    super(message);
    this.name = "ArgumentError";
  }
}
