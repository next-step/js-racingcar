import { MESSAGES } from './constants/messages.js';
import { RacingSystem } from './domain/controller/RacingSystem.js';
import { validateNames, validateRound } from './domain/validator.js';
import { manipulateReadline } from './util/manipulateReadline.js';

const racingSystem = new RacingSystem();

async function main() {
  const NAMES = await manipulateReadline.questionReadline(
    `${MESSAGES.GAME.START_PROMPT}`,
    validateNames,
  );
  const ROUND = await manipulateReadline.questionReadline(
    `${MESSAGES.GAME.ROUND_HEADER}`,
    validateRound,
  );
  racingSystem.startGame(NAMES, ROUND);
  manipulateReadline.closeReadline();
}

main();
