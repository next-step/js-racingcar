export const getRandomNumberZeroToNine = () => Math.floor(Math.random() * 10);

export const insertElement = ($target) => {
  return {
    beforeBegin: ($element) =>
      $target.insertAdjacentHTML("beforebegin", $element),
    beforeEnd: ($element) => $target.insertAdjacentHTML("beforeend", $element),
    afterBegin: ($element) =>
      $target.insertAdjacentHTML("afterbegin", $element),
    afterEnd: ($element) => $target.insertAdjacentHTML("afterend", $element),
  };
};
