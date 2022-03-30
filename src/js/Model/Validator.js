class Validator {
  static isEmpty(text = '') {
    return text.split(',').some(e => !e.trim()) 
  }

  static isCorrectLength(text) {
    return text.split(',').some(e => e.length > 5)
  }
}

export default Validator;
