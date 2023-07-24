import { splitStringByComma } from '../../src/utils/splitStringByComma';

describe('splitStringByComma 테스트', () => {
  describe("문자열일이 ',' 기준으로 파싱 된 후 배열로 반환 된다.", () => {
    test('콤마가 1개일 때 2개의 문자열로 파싱된다.', () => {
      const array = ['문자1', '문자2'];
      const targetString = array.join(',');
      const spliited = splitStringByComma(targetString);

      expect(spliited.every((string) => array.includes(string))).toBe(true);
    });

    test('콤마가 4개일 때 5개의 문자열로 파싱된다.', () => {
      const array = ['문자1', '문자2', '문자3', '문자4', '문자5'];
      const targetString = array.join(',');
      const spliited = splitStringByComma(targetString);

      expect(spliited.every((string) => array.includes(string))).toBe(true);
    });
  });
});
