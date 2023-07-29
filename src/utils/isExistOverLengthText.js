export const isExistOverLengthText = (texts, lengthThreshhold) => {
  if (lengthThreshhold < 0) {
    throw new Error('lengthThreshhold는 0이상의 정수여야 합니다');
  }

  return texts.every(text => text.length <= lengthThreshhold);
};
