export const debounceFrame = (callback) => {
  let currentCallback = -1;
  return () => {
    cancelAnimationFrame(currentCallback);
    currentCallback = requestAnimationFrame(callback);
  };
};

export const validateCarNames = (carNamesArray) => {
  if (!carNamesArray || !carNamesArray.length) return;

  return carNamesArray
    .filter((name) => Boolean(name) === true)
    .every((el) => el.length >= 1 && el.length < 6);
};

export const splitingCarNames = (carNames) => {
  const copyName = carNames;

  if (!carNames.length) return [];
  return copyName.split(',').filter((name) => name.trim());
};

const makeRandomNumber = (minValue = 0, maxValue = 9) => {
  return Math.floor(Math.random() * maxValue + minValue);
};

export const getProgressOrNot = () => {
  return makeRandomNumber() > 4;
};

export const waitUntil = (delay) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export const getRacingWinner = ({ racingMap, trialNumber }) => {
  if (!racingMap || !racingMap.size) return false;

  return [...racingMap.keys()]
    .map((carId) => {
      const progressArray = racingMap.get(carId);
      if (
        progressArray.filter((el) => el === true).length === Number(trialNumber)
      ) {
        return carId;
      }
    })
    .filter((el) => Boolean(el));
};

export function makeNewRacingMap(prevRacingMap) {
  if (!prevRacingMap.size) return prevRacingMap;

  const updatedRacingMap = new Map([...prevRacingMap]);

  [...updatedRacingMap.keys()].forEach((key) => {
    updatedRacingMap.set(key, [
      ...updatedRacingMap.get(key),
      getProgressOrNot(),
    ]);
  });

  return updatedRacingMap;
}

export const makeDefaultRacingMap = (carNames) => {
  const map = new Map();
  splitingCarNames(carNames).forEach((el, idx) => {
    const carId = `${el}-${idx}`;

    map.set(carId, []);
  });

  return map;
};

export const makeDataAttributeIdForm = (dataIdsObject) => {
  const formedObject = {};
  Object.entries(dataIdsObject).forEach(
    ([key, value]) => (formedObject[key] = `[data-id=${value}]`)
  );
  return formedObject;
};
