export function isNumber(value) {
  return typeof value === "number" && !isNaN(Number(value));
}
