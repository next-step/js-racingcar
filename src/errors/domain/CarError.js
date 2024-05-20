import { CustomError } from "../CustomError";

export class CarError extends CustomError {
  constructor(message) {
    super("CarError", message);
  }
}
