export const splitCarName = carName => {
  const DELIMITER = ",";
  return carName.split(DELIMITER);
};

export const generateNumberInRange = ({ min, max }) => {
  const number = Math.floor(Math.random() * (max + 1)) + min;
  return number;
};

export const updateInterval = ({ fn, interval, times }) => {
  const timer = count => {
    setTimeout(() => {
      if (count >= times) return;

      fn();
      timer(count + 1);
    }, interval);
  };
  timer(0);
};
