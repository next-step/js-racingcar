export const isOnlyNumber = (string) => /^[0-9]*$/.test(string);
export const isMinimumLength = (string, boundary) => string.length >= boundary;
export const isMaximumLength = (string, boundary) => string.length <= boundary;
export const splitString = (string, separator) => string.split(separator);
