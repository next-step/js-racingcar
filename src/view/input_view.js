import { readLineAsync } from './read_line_async.js';

export const inputNames = async () => {
  const names = await readLineAsync('경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).');
  return names.split(',').map((name) => name.trim());
};
