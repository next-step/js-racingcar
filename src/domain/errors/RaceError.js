import { CustomError } from "./CustomError";

export class RaceError extends CustomError {
  constructor(message) {
    super("RaceError", message);
  }
}
