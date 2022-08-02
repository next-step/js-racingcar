const alertText = (string) => {
  alert(string);
};

const setVisible = (element) => {
  element.classList.add('visible');
};

const setElementDisabled = (element) => {
  element.disabled = true;
};

const setElementUsable = (element) => {
  element.disabled = false;
};

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export {
  alertText,
  setVisible,
  setElementDisabled,
  setElementUsable,
  getRandomNumber,
};
