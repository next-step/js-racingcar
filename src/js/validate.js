export const isCorrectRange = (carName) => {
  //   console.log(carName);

  //   carName.forEach((element) => console.log(element.length));
  //   carName.forEach((element) => element.length >= 1 && element.length <= 5);
  //   carName.forEach((element) => {
  //     console.log(element.length);
  //     if (element.length < 1) {
  //       return false;
  //     }
  //     return true;
  //   });
  return carName.every((element) => element.length >= 1 && element.length <= 5);

  //   carName.forEach((element) => element.length > 1 && element.length < 5);
};

// export const validNames = (carName) => {
//   console.log(isCorrectRange(carName));
//   if (isCorrectRange(carName)) alert('자동차이름을 한글자 이상 다섯글자 이하로 입력하세요.');
// };
