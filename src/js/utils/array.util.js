export class ArrayUtil {
  static toTrim(arr = []) {
    return arr.map(el => el.trim());
  }
}
