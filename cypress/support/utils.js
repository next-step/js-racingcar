function splitCarNames(carNames) {
  return carNames.split(",").map((name) => name.trim());
}

export { splitCarNames };
