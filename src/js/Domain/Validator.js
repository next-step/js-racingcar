class Validator {
  static isEmpty(text = '') {
    return text.trim().length === 0
  }
}

export default Validator;
