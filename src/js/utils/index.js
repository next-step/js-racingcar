export const $ = (selector, baseElement = document) => {
  const selectors = [...baseElement.querySelectorAll(selector)];

  if (selectors.length > 1) return selectors;

  return selectors[0];
}

export const splittedText = (text) => text.split(',').map(v => v.trim(""));
