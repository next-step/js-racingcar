const carName = {
  MIN_LENGTH: 1,
  MAX_LENGTH: 5,
};

function isEmptyCarName(name) {
  if (name === undefined || name === null || name.trim() === '')
    throw new Error('이름은 필수 입니다.');
}

function isInValidCarNameLength(name) {
  if (!(name.length >= carName.MIN_LENGTH && name.length <= carName.MAX_LENGTH))
    throw new Error(
      `이름은 ${carName.MIN_LENGTH}~${carName.MAX_LENGTH} 까지 가능합니다.`
    );
}

function validateName(name) {
  isEmptyCarName(name);
  isInValidCarNameLength(name);
}
export { validateName };
