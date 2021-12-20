export const $ = (selector: string, parentNode: HTMLElement | Document = document) => {
  return parentNode.querySelector(selector);
};
