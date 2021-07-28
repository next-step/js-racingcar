export const isValidNames = (names) => {
  let isCar = true;
  names.split(",").forEach((name) => {
    if (name.length > 5 || name.length < 1) {
      alert("유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.");
      isCar = false;
    }
  });
  return isCar;
};
