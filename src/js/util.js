const alertText = (string) => {
  alert(string);
};

const setVisible = (element) => {
  element.classList.add('visible');
};

const setElementDisabled = (element) => {
  element.disabled = true;
};

export { alertText, setVisible, setElementDisabled };
