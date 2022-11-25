// TODO: 별도의 파일로 분리하기 (validator 주제와 다르다)
export const REGEX_SPACE = /\s+/g;
/**
 *
 * @param {string} string
 * @returns {string}
 */
export const removeSpaces = (str) => (str || '').replace(REGEX_SPACE, '');
