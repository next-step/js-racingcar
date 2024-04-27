import { Errors } from "../common";

const CAR_NAME_REQUIRED = "Car name is required";
const CAR_NAME_TOO_LONG = "Car name is too long";

export class CarNameRequiredError extends Errors.ValidationError {
  constructor() {
    super(CAR_NAME_REQUIRED);
  }
}
export class CarNameTooLongError extends Errors.ValidationError {
  constructor() {
    super(CAR_NAME_TOO_LONG);
  }
}
