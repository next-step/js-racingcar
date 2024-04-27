import { CarNameRequiredError, CarNameTooLongError } from "./car.error.js";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "./car.constant.js";

export function validateCarName(name) {
  if (!name) throw new CarNameRequiredError();
  if (name.length < NAME_MIN_LENGTH) throw new CarNameRequiredError();
  if (name.length > NAME_MAX_LENGTH) throw new CarNameTooLongError();
}
