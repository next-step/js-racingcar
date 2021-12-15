export const $ = (dom, baseEl) => {
  if (baseEl) {
    return baseEl.querySelector(dom)
  }
  return document.querySelector(dom)
}
