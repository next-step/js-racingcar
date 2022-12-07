export class NumberUtil {
  static randomNumber(min = 0, max = 9) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
