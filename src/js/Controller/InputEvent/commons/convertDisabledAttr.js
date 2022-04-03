const convertDisabledAttr = ({input, button}) => {
  input.disabled = true
  button.disabled = true
  input.setAttribute('value', input.value)
}

export default convertDisabledAttr;
