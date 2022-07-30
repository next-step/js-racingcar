export const removeHiddenClass = ($selector) => {
  $selector.classList.remove("hidden");
};

export const displayTemplate = ($selector, template) => {
  $selector.innerHTML = template;
};
