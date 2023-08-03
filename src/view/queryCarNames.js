import {queryLineInput} from './queryLineInput';
import {splitByComma} from '../utils/splitByComma';
import {MAXIMUM_CAR_NAME_LENGTH} from '..';
import {isExistOverLengthText} from '../utils/isExistOverLengthText';
import {isExistEmptyText} from '../utils/isExistEmptyText';
import {trimTexts} from '../utils/trimTexts';

export const queryCarNames = onInput => {
  queryLineInput({
    queryText: '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n',
    onLineInput: line => {
      const carNames = trimTexts(splitByComma(line));

      if (!isExistOverLengthText(carNames, MAXIMUM_CAR_NAME_LENGTH)) {
        console.log('자동차 이름은 5자 이하로 입력해주세요.\n');
        queryCarNames();
        return;
      }

      if (isExistEmptyText(carNames)) {
        console.log('자동차 이름은 공백이 될 수 없습니다.\n');
        queryCarNames();
        return;
      }

      onInput(carNames);
    },
  });
};
