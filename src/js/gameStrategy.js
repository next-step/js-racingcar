const GO_OR_STOP_CONDITION = 3;
const GENERATION_MIN = 0;
const GENERATION_MAX = 9;

export const gameStrategy = {
  getRandomNumber: () =>
    Math.floor(Math.random() * (GENERATION_MAX - GENERATION_MIN + 1)) + GENERATION_MIN,
  isGoOrStop: randomNum => randomNum > GO_OR_STOP_CONDITION,
};

export const race = (condition, param = null) => gameStrategy[condition](param);
