export const splitCarName = carName => {
  const DELIMITER = ",";
  return carName.split(DELIMITER);
};

export const generateNumberInRange = ({ min, max }) => {
  const number = Math.floor(Math.random() * (max + 1)) + min;
  return number;
};
