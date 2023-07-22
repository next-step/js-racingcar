export const Validator = Object.freeze({
  isWithInMaxLength(string, maxLength) {
    if (string <= maxLength) return true;

    return false;
  },
});
