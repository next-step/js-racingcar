const getWinners = (...args) => {
  const result = [];
  let maxPosition = 0;

  for (let i = 0; i < args.length; i++) {
    if (args[i].position > maxPosition) {
      maxPosition = args[i].position;
    }
  }
  for (let i = 0; i < args.length; i++) {
    if (args[i].position === maxPosition) {
      result.push(args[i].name);
    }
  }

  return result;
};

module.exports = { getWinners };
