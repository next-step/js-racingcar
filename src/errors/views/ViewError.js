import { CustomError } from "../CustomError";

export class ViewError extends CustomError {
  constructor(message) {
    super("ViewError", message);
  }
}
