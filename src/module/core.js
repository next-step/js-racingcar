export const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max + 1 - min) + min);
export const getCommand = (number) => (number >= 4 ? "go" : "stop");
