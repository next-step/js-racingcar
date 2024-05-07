import { ClientError } from "./ClientError";

export class ViewError extends ClientError {
  constructor(message) {
    super("ViewError", message);
  }
}
