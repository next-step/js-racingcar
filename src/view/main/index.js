import { readLineAsync } from '../../libs/readline.js';

/**
 * 자동차 이름을 입력 받을 수 있는 필드 함수
 *
 * @returns 입력 필드
 */
export const renderCarNamesInput = async () => {
  console.log(
    '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).',
  );

  return await readLineAsync('');
};

/**
 * 게임 횟수를 입력 받을 수 있는 필드 함수
 *
 * @returns 입력 필드
 */
export const renderLapInput = async () => {
  console.log('시도할 횟수는 몇회인가요?');

  return await readLineAsync('');
};
