export const duplicateTemplate = templateId => {
  const $templateElement = document.getElementById(templateId);
  return document.importNode($templateElement.content, true).firstElementChild;
};
