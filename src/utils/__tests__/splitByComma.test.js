import {splitByComma} from '../splitByComma';

describe('splitByComma test', () => {
  test(',를 기준으로 문자열을 나눈다', () => {
    const text1 = 'pobi, crong, honux';
    expect(splitByComma(text1)).toEqual(['pobi', ' crong', ' honux']);

    const text2 = 'pobi crong,honux';
    expect(splitByComma(text2)).toEqual(['pobi crong', 'honux']);
  });
});
