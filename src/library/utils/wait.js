const wait = waitingTime => {
  return new Promise(resolve => setTimeout(() => resolve(), waitingTime));
};

export default wait;
