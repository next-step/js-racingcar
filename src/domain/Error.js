export class ClientError extends Error {
  constructor(name, message) {
    super(message);
    this.name = name;
  }
}

export class CarError extends ClientError {
  constructor(message) {
    super("CarError", message);
  }
}

export class InputError extends ClientError {
  constructor(message) {
    super("InputError", message);
  }
}
