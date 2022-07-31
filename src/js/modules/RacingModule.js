import racingData from "./RacingData.js";
import { CAR_NAME_MAX_LENGTH, CONDITIONS } from "../consts.js";
import { getRandomInteger, toArrayBySeparator, eventLoop } from "../utils.js";
const RacingModule = () => {
  const getCarNames = (value) => {
    return toArrayBySeparator(value);
  };
  const hasTooLongName = (names, limitLength = CAR_NAME_MAX_LENGTH) =>
    !!names.find((name) => name.trim().length > limitLength);

  const isBlink = (names) => !!names.find((name) => !name);

  const getResultTryOnce = (raceStatus) => {
    return raceStatus.map(({ name, position }) => {
      if (
        getRandomInteger(CONDITIONS.RANDOM_NUMBER_MAX) > CONDITIONS.MOVE_CAR_MIN
      ) {
        ++position;
      }
      return { name, position };
    });
  };

  const isStoppableRace = (raceStatus, goalTryNumber) =>
    !!raceStatus.find(({ position }) => position === goalTryNumber);

  const getWinners = (raceStatus, goalTryNumber) =>
    raceStatus.filter(({ position }) => position === goalTryNumber);

  const goRace = (raceData, tryOnceEvent) => {
    const { status, goalTryNumber } = raceData;
    return eventLoop(
      status,
      tryOnceEvent,
      (raceStatus) => isStoppableRace(raceStatus, goalTryNumber),
      (f) => setTimeout(f, 1000)
    ).then((raceResult) => {
      const winners = getWinners(raceResult, goalTryNumber);
      return winners;
    });
  };

  return {
    getCarNames,
    isBlink,
    hasTooLongName,
    getResultTryOnce,
    isStoppableRace,
    goRace,
    getWinners,
  };
};

export default RacingModule;
