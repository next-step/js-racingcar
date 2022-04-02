export const duplicateTemplate = templateId => {
  const $templateElement = document.getElementById(templateId);
  return document.importNode($templateElement.content, true).firstElementChild;
};


export const makeDisableByID = selectorId => {
  document.getElementById(selectorId).setAttribute('disabled', true);
};
