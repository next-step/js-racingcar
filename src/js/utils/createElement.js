const createElement = (target, htmlStr) => {
  const parents = document.querySelector(target);
  if (!htmlStr) {
    return parents;
  }
  parents.innerHTML = htmlStr.trim();

  return parents.firstChild;
};

export default createElement;
