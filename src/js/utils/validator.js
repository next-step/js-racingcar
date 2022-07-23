export const isHTMLFormElement = (element) => {
  return element instanceof HTMLFormElement;
};

export const isEmptyString = (value) => {
  return value.trim().length === 0;
};

export const isFunction = (value) => {
  return typeof value === "function";
};

export const isDuplicated = (value) => {
  return value.length > new Set(value).size;
};
