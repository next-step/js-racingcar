const MIN_CAR_NAME_LENGTH = 1;
const MAX_CAR_NAME_LENGTH = 5;

class CarName {
  static isEmptyCarName(name) {
    return name === undefined || name === null || name.trim() === '';
  }

  static isValidCarName(name) {
    return (
      name.length >= MIN_CAR_NAME_LENGTH && name.length <= MAX_CAR_NAME_LENGTH
    );
  }
}
export default CarName;
