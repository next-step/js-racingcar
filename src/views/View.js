class View {
  enableElement($target) {
    $target.removeAttribute("disabled");
    $target.classList.remove("disabled");
  }

  disableElement($target) {
    $target.setAttribute("disabled", "");
    $target.classList.add("disabled");
  }

  showElement($target) {
    $target.classList.remove("hide");
  }

  hideElement($target) {
    $target.classList.add("hide");
  }
}

export default View;
