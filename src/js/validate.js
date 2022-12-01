const correctRange = (carName) => {
  //   console.log(carName);

  //   carName.forEach((element, index) => element[index].length > 1 && element[index].length < 5);

  //   carName.forEach((element) => console.log(element));
  carName.forEach((element) => console.log(element.length));

  //   carName.forEach((element) => element.length > 1 && element.length < 5);
};

export const validNames = (carName) => {
  try {
    if (!correctRange(carName)) throw new Error('5자 이하의 차 이름을 입력해주세요.');
  } catch (error) {
    return alert(error.message);
  }
};
