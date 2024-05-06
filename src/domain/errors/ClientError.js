export class ClientError extends Error {
  constructor(name, message) {
    super(message);
    this.name = name;
  }
}
