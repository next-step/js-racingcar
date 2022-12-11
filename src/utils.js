export const getRandomNumberZeroToNine = () => Math.floor(Math.random() * 10);

export const insertElement = ($element) => {
  return {
    to: ($target) => {
      return {
        beforeBegin: () => $target.insertAdjacentHTML("beforebegin", $element),
        beforeEnd: () => $target.insertAdjacentHTML("beforeend", $element),
        afterBegin: () => $target.insertAdjacentHTML("afterbegin", $element),
        afterEnd: () => $target.insertAdjacentHTML("afterend", $element),
      };
    },
  };
};
