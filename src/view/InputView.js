import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { INPUT_MESSAGE } from '../constants';
import { genRacingCarArray } from '../utils/view.js';

const InputView = {
  async inputCarNames() {
    const rl = readline.createInterface({ input, output });
    const answer = await rl.question(INPUT_MESSAGE.RACING_CAR);
    rl.close();
    return genRacingCarArray(answer);
  },
};

export default InputView;
