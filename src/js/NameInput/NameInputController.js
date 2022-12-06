// 컨트롤러는 앱의 사용자로부터의 입력에 대한 응답으로 모델 및 뷰를 업데이트하는 로직을 포함합니다.
// 따라서 instance로 존재할 필요는 없다고 판단했습니다.

import { carNameInputSetView } from '../Views/CarNameInputView.js';
import { countInputSetView } from '../Views/CountInputView.js';

carNameInputSetView.onClick({
  onClickButton: ({ inputElement }) => {
    const inputValues = inputElement.value?.split(',');
    const isInputValLengthCorrect = inputValues.some((inputVal) => !!inputVal && inputVal.length <= 5);

    if (!isInputValLengthCorrect) {
      alert('유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.');
      return;
    }

    carNameInputSetView.disable();
    countInputSetView.show();
  },
})
