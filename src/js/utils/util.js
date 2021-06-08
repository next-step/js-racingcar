export const $ = (selector) => document.querySelector(selector);
export const $$$ = (parent, child) => parent.querySelector(child);

export const setSelectorHidden = (selector, isHidden) => {
  if (isHidden) {
    // selector.classList.add("hidden");
    selector.style.display = "none";
    return;
  }
  //   selector.classList.remove("hidden");
  selector.style = "";
};
