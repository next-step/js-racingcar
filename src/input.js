import { readLineAsync } from './readline-utils.js';
import Car from './domain/Car.js';
import Race from './domain/Race.js';

export function formatCarNameInput(names) {
  return names.split(',');
}

export async function getCarName() {
  const input = await readLineAsync('경주할 자동차 이름을 입력하세요\n');

  const names = formatCarNameInput(input);

  names.forEach((name) => {
    if (!Car.validateName(name)) process.exit();
  });

  return names;
}

export async function getRaceRoundCount() {
  const input = await readLineAsync('시도할 회수는 몇회인가요?\n');
  const roundCount = Number(input);

  if (!Race.validateRoundCount(roundCount)) process.exit();

  return roundCount;
}
