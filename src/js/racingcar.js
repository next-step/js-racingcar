// event handler 에서 뺸 함수들
const TRIM_BETWEEN_COMMA = /\s*,\s*/g;
const COMMA = ',';

export const trimNameList = value => value.replace(TRIM_BETWEEN_COMMA, COMMA).trim();

export const splitNameList = name => name.split(COMMA);
