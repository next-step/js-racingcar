export const $ = (e) => document.querySelector(e);

export const handledisabled = (...elements) => {
  elements.forEach((element) => {
    element.disabled = true;
  });
};
