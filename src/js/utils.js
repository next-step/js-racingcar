export const addHiddenClass = (selector) => {
  selector.classList.add('hidden');
};

export const removeHiddenClass = (selector) => {
  selector.classList.remove('hidden');
};

export const getRandomCount = () => {
  return Math.floor(Math.random() * 10);
};
