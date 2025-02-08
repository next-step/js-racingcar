import { readLineAsync } from './readline-utils.js';

export function formatCarNameInput(names) {
  return names.split(',');
}

export function isValidCarName(nameArray) {
  const NAME_MAX_LENGTH = 5;

  let result = true;

  nameArray.forEach((name) => {
    if (name.length > NAME_MAX_LENGTH) {
      result = false;
      return;
    }
  });

  return result;
}

export async function getCarName() {
  const input = await readLineAsync('경주할 자동차 이름을 입력하세요\n');

  const name = formatCarNameInput(input);

  if (isValidCarName(name) === false) {
    process.exit();
  }

  return name;
}
