import Game from './services/Game.js';
import { isInputValid } from './utils/index.js';
import { readLineAsync } from './libs/readline.js';

async function main() {
  console.log('경주할 자동차 이름을 입력하세요.');
  const input = await readLineAsync('');

  if (!isInputValid(input)) {
    console.log('잘못 입력하셨습니다. 프로그램을 종료합니다.');
    return;
  }

  const names = input.split(',').map((value) => value.trim());
  const game = new Game({ names });

  game.start();
}

main();
