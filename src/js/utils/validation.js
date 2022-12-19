const isValidCarNames = (carNames) => {
  if (!carNames) throw new Error("유효하지 않은 입력값입니다. ");

  if (
    carNames.some((carName) => {
      const trimmedName = carName.trim();
      return trimmedName.length > 5 || trimmedName.length <= 0;
    })
  ) {
    throw new Error("유효하지 않은 입력값입니다.");
  }

  return true;
};

export { isValidCarNames };
