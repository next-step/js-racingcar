import { ClientError } from "./ClientError";

export class RaceError extends ClientError {
  constructor(message) {
    super("RaceError", message);
  }
}
