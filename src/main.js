import Game from './services/Game.js';
import { isCarNamesValid, isLapVaild } from './utils/index.js';
import { readLineAsync } from './libs/readline.js';

async function main() {
  console.log(
    '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).',
  );
  const inputNames = await readLineAsync('');

  console.log('시도할 회수는 몇회인가요?');
  const inputLap = await readLineAsync('');

  if (!isCarNamesValid(inputNames) || !isLapVaild(inputLap)) {
    console.log('잘못 입력하셨습니다. 프로그램을 종료합니다.');
    return;
  }

  const names = inputNames.split(',').map((value) => value.trim());
  const lap = Number(inputLap) || undefined;

  const game = new Game({ names, lap });

  game.start();
}

main();
