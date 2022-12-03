import { CAR_NAME } from '../../const.js';

export function validateCarName(nextCarName) {
  return (
    nextCarName.length > CAR_NAME.MIN_LENGTH &&
    nextCarName.length <= CAR_NAME.MAX_LENGTH
  );
}

export function validateCarNames(nextCardNames) {
  const validatedCarNames = nextCardNames.filter((carName) =>
    validateCarName(carName)
  );

  return validatedCarNames.length === nextCardNames.length;
}
