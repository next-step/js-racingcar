export const Validator = Object.freeze({
  isWithInMaxLength(string, maxLength) {
    return string.length <= maxLength;
  },
});
