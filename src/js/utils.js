const toArrayBySeparator = (string, separator = ",") => string.split(separator);
const getRandomInteger = (maxValue) => Math.floor(Math.random() * ++maxValue);

const eventLoop = (data, eventFunc, isStoppable, setTimer) => {
  return new Promise((res) => {
    let currData = data;
    const f = () => {
      currData = eventFunc(currData);
      if (isStoppable(currData)) {
        res(currData);
      } else {
        setTimer(f);
      }
    };
    setTimer(f);
  });
};

export { toArrayBySeparator, getRandomInteger, eventLoop };
