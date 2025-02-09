import { readLineAsync } from './readline-utils.js';
import Car from './domain/Car.js';

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
