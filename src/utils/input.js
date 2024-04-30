export function parseInput(input) {
  const regex = /^[0-9A-Za-z]+(?:,[0-9A-Za-z]+)*$/;
  if (!regex.test(input)) {
    throw new Error('자동차 이름은 쉼표(,)를 기준으로만 구분할 수 있습니다.');
  }
  console.log(`자동차 이름은 ${input}입니다.\n`);
  return input.split(',');
}
