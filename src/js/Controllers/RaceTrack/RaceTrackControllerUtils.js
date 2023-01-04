import { createRandomNumber } from "../../utils/utils.js";
import { dispatch, actions } from "../../Stores/race/index.js";

const MAX_RANDOM_NUMBER = 9;
const JUDGEMENT_NUMBER = 4;

export function executeNextRace(carStates) {
  const carShouldAdvanceResults = [];
  const newRaceState = carStates.map((el) => {
    const shouldAdvance = checkIsCanBeAdvanced(createRandomNumber(MAX_RANDOM_NUMBER));
    carShouldAdvanceResults.push(shouldAdvance);

    const advanceDistance = getAdvanceDistance(shouldAdvance);

    if (shouldAdvance) {
      return {
        ...el,
        distance: el.distance + advanceDistance,
      };
    }

    return el;
  });

  dispatchNextRaceState(newRaceState);

  return carShouldAdvanceResults;
}

function dispatchNextRaceState(newRaceState) {
  dispatch(actions.PROGRESS, newRaceState);
}

function getAdvanceDistance(shouldAdvance) {
  if (shouldAdvance) return 1;
  return 0;
}

export function checkIsCanBeAdvanced(number) {
  return number >= JUDGEMENT_NUMBER
}
