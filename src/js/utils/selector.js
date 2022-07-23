export default (selector, element) => {
  return (element || document).querySelector(selector);
};
