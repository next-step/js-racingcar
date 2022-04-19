export const asyncMap = async (array, callback) =>
  array.reduce(
    (prevPromise, currElem, index) =>
      prevPromise.then(async (prevRes) => {
        const currRes = await callback(currElem, index); // [C]
        return [...prevRes, currRes];
      }),
    Promise.resolve([])
  );
