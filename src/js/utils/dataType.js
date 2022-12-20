const sliceBegin = 8;
const sliceEnd = -1;

export const getDataType = target =>
  Object.prototype.toString.call(target).slice(sliceBegin, sliceEnd);
