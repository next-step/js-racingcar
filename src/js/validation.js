const isValidName = (carNames) => {
  const invalidCarNames = carNames.filter(name => name.length > 5 || name.length === 0)

  return !Boolean(invalidCarNames.length) ? true : false;  
}

export default isValidName;