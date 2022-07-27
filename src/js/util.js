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

export { alertText, setVisible, setElementDisabled, setElementUsable };
