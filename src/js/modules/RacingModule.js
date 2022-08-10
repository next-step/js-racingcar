import { getRandomInteger, toArrayBySeparator, delay } from '../utils.js';

const CAR_NAME_MAX_LENGTH = 5;
const CONDITIONS = {
  RANDOM_NUMBER_MAX: 9,
  MOVE_CAR_MIN: 4,
  STOP_CAR_MAX: 3,
};

const RacingModule = () => {
  const getCarNames = (value) => {
    return toArrayBySeparator(value);
  };
  const hasTooLongName = (names, limitLength = CAR_NAME_MAX_LENGTH) =>
    !!names.find((name) => name.trim().length > limitLength);

  const isBlink = (names) => !!names.find((name) => !name);

  const moveRandom = ({ name, position }) => {
    if (
      getRandomInteger(CONDITIONS.RANDOM_NUMBER_MAX) > CONDITIONS.MOVE_CAR_MIN
    ) {
      ++position;
    }
    return { name, position };
  };

  const getResultTryOnce = (raceStatus, tryMethod) => {
    return raceStatus.map(tryMethod);
  };

  const isFinishedRace = (raceStatus, goalPosition) =>
    !!raceStatus.find(({ position }) => position === goalPosition);

  const getWinners = (raceStatus, goalPosition) =>
    raceStatus.filter(({ position }) => position === goalPosition);

  const goRace = async (racingProcessInfo, turnEvent) => {
    const { status, goalPosition } = racingProcessInfo;

    let currData = status;

    const raceSingleTurn = async () => {
      currData = turnEvent(currData);
      if (isFinishedRace(currData, goalPosition)) return currData;
      await delay();
      return raceSingleTurn();
    };
    const raceResult = await raceSingleTurn();

    return getWinners(raceResult, goalPosition);
  };

  return {
    getCarNames,
    hasTooLongName,
    moveRandom,
    getResultTryOnce,
    goRace,
  };
};

export default RacingModule;
export { CAR_NAME_MAX_LENGTH, CONDITIONS };
