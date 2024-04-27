import { Errors } from "../common";

const BOUNDARY_TYPE_ERROR = "Left and right must be numbers";
const BOUNDARY_RANGE_ERROR = "Left boundary must be less than right boundary";

export class BoundaryRangeError extends Errors.ValidationError {
  constructor() {
    super(BOUNDARY_RANGE_ERROR);
  }
}

export class BoundaryTypeError extends Errors.TypeError {
  constructor() {
    super(BOUNDARY_TYPE_ERROR);
  }
}

export function boundaryRandomNumber(left, right) {
  if (typeof left !== "number" || typeof right !== "number") {
    throw new BoundaryTypeError();
  }

  if (left > right) {
    throw new BoundaryRangeError();
  }

  return Math.floor(Math.random() * (right - left + 1)) + left;
}
