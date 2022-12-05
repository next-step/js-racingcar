export function $(selector) {
  return document.querySelector(selector);
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function filledArray(count) {
  return Array(count).fill();
}
