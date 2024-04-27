import { ValidationError } from "../../common/error.js";

const CAR_NAME_REQUIRED = "Car name is required";
const CAR_NAME_TOO_LONG = "Car name is too long";

export class CarNameRequiredError extends ValidationError {
  constructor() {
    super(CAR_NAME_REQUIRED);
  }
}
export class CarNameTooLongError extends ValidationError {
  constructor() {
    super(CAR_NAME_TOO_LONG);
  }
}
