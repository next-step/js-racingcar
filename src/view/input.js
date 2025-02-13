import { readLineAsync } from '../readline-utils.js';

export function formatCarNameInput(names) {
  return names.split(',');
}

export async function inputCarNames() {
  const input = await readLineAsync('경주할 자동차 이름을 입력하세요\n');
  const names = formatCarNameInput(input);

  return names;
}

export async function inputRaceRoundCount() {
  const input = await readLineAsync('시도할 회수는 몇회인가요?\n');
  const roundCount = Number(input);

  return roundCount;
}
