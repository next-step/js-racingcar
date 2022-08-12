import {
  getRandomInteger,
  toArrayBySeparator,
  delay,
  getMaxValueByObjectKey,
} from '../utils.js';
import ValidationError, { INVALID_MESSAGES } from './ValidationError.js';

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
  const checkTooLongName = (names, limitLength = CAR_NAME_MAX_LENGTH) => {
    if (!!names.find((name) => name.trim().length > limitLength)) {
      throw new ValidationError(INVALID_MESSAGES.NAME.MAX_LENGTH, alert);
    }
  };

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

  const getWinners = (raceStatus) => {
    const winnerPosition = getMaxValueByObjectKey(raceStatus, 'position');
    return raceStatus.filter(({ position }) => position === winnerPosition);
  };

  const goRace = async (racingProcessInfo, turnEvent) => {
    const { status, tryEndNumber } = racingProcessInfo;

    let currData = status;
    let tryCount = 0;

    const raceSingleTurn = async () => {
      currData = turnEvent(currData);
      if (++tryCount === tryEndNumber) return currData;
      await delay();
      return raceSingleTurn();
    };
    const raceResult = await raceSingleTurn();
    return getWinners(raceResult);
  };

  return {
    getCarNames,
    checkTooLongName,
    moveRandom,
    getResultTryOnce,
    goRace,
  };
};

export default RacingModule;
export { CAR_NAME_MAX_LENGTH, CONDITIONS };
