export const $ = (selector, baseElement = document) => {
  const selectors = [...baseElement.querySelectorAll(selector)];

  if (selectors.length > 1) return selectors;

  return selectors[0];
}
