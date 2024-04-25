import { MOVE_MAX, MOVE_MIN } from "../constants";

export const getRandomInRange = (min = MOVE_MIN, max = MOVE_MAX) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
