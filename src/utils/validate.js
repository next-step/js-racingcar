export const validateName = (name) => {
  if (name.length > 5 || name.length === 0) {
    throw new Error('자동차 이름은 길이 1 이상, 5 이하여야 합니다.')
  }

  if (!/^[\p{Script=Hangul}\p{Script=Latin}]+$/u.test(name)) {
    throw new Error('자동차 이름은 한글, 영문만 가능합니다.')
  }
}

export const validateDuplicates = (names) => {
  if (new Set(names).size !== names.length) {
    throw new Error('중복된 이름은 입력할 수 없습니다.')
  }
}
