import {queryLineInput} from './queryLineInput';
import {isPositiveInteger} from '../utils/isPositiveInteger';

export const queryRacingNumber = onInput => {
  queryLineInput({
    queryText: '시도할 회수는 몇회인가요?\n',
    onLineInput: line => {
      const racingNumber = Number(line);
      if (!isPositiveInteger(racingNumber)) {
        console.log('양의 정수를 입력해주세요.\n');
        queryRacingNumber(carNames);
        return;
      }

      onInput(racingNumber);
    },
  });
};
