const SubForm = (dataName, placeholder) => {
  return `
    <form class="d-flex car-name-form" data-form="${dataName}-form">
      <input type="${dataName === 'name' ? 'text' : 'number'}" class="w-100 mr-2 car-name-input" placeholder="${placeholder}" data-form="${dataName}-input"/>
      <button type="submit" class="btn btn-cyan car-name-button" data-form="${dataName}-button">확인</button>
    </form>
  `
}

export default SubForm;
