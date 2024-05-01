export class ClientError extends Error {
  constructor(name, message) {
    super();
    this.name = name;
    this.message = message;
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
