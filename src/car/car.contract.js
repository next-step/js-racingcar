import { CarNameRequiredError, CarNameTooLongError } from "./car.errors";

export function validateCarName(name) {
  if (!name) throw new CarNameRequiredError();
  if (name.length === 0) throw new CarNameRequiredError();
  if (name.length > 5) throw new CarNameTooLongError();
}
