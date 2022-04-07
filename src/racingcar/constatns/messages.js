import { MIN_NAME_LENGTH, MAX_NAME_LENGTH, MIN_TRY_COUNT } from '.';

const NOT_ALLOWED_NAME_LENGTH = `유효하지 않은 이름 길이입니다. 자동차의 이름은 ${MIN_NAME_LENGTH}자이상, ${MAX_NAME_LENGTH}자 이하만 가능합니다.`;
const NOT_ALLOWED_TRY_COUNT = `입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 ${MIN_TRY_COUNT}이상이어야 합니다.`;

export { NOT_ALLOWED_NAME_LENGTH, NOT_ALLOWED_TRY_COUNT };
