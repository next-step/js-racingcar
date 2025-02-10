import Game from './domain/game/service.js';
import { isCarNamesValid, isLapVaild } from './domain/game/utils.js';
import { renderCarNamesInput, renderLapInput } from './view/main/index.js';

async function main() {
  const inputNames = await renderCarNamesInput();
  const inputLap = await renderLapInput();

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
