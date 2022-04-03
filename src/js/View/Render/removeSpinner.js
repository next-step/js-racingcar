import { selectorAll } from "../../util/consts.js"


const removeSpinner = (value) => {
  setTimeout(
    selectorAll('.track-container')
      .forEach((tag) => tag.removeChild(tag.querySelector('.spinner-component')))
  , 1000 * value)
}

export default removeSpinner
