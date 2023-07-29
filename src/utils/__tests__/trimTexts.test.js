import {trimTexts} from '../trimTexts';

describe('trimTexts test', () => {
  test('문자열들의 양 옆 공백을 제거한다', () => {
    const texts = ['pobi ', ' crong ', ' honux', 'jest'];
    expect(trimTexts(texts)).toEqual(['pobi', 'crong', 'honux', 'jest']);
  });
});
