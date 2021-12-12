const removeChildrenAll = ($parent) => {
  while ($parent.hasChildNodes()) {
    $parent.removeChild($parent.firstChild);
  }
};

export { removeChildrenAll };
