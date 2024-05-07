import { ClientError } from "./ClientError";

export class CarError extends ClientError {
  constructor(message) {
    super("CarError", message);
  }
}
