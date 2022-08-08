import { CAR_NAME_MAX_LENGTH, CONDITIONS } from '../consts.js';
import { getRandomInteger, toArrayBySeparator, delay } from '../utils.js';
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

  const goRace = async (raceData, turnEvent) => {
    const { status, goalPosition } = raceData;

    let currData = status;

    const raceSingleTurn = async () => {
      currData = turnEvent(currData);
      if (isFinishedRace(currData, goalPosition)) return currData;
      else return await delay(raceSingleTurn);
    };
    const raceResult = await delay(raceSingleTurn);

    return getWinners(raceResult, goalPosition);
  };

  return {
    getCarNames,
    isBlink,
    hasTooLongName,
    moveRandom,
    getResultTryOnce,
    isFinishedRace,
    goRace,
    getWinners,
  };
};

export default RacingModule;
