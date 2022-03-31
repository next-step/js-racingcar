const SubForm = (dataName, placeholder) => {
  return `
    <div class="d-flex" data-form="${dataName}-container">
      <input type="${dataName === 'name' ? 'text' : 'number'}" class="w-100 mr-2 car-name-input" placeholder="${placeholder}" data-form="${dataName}-input"/>
      <button type="button" class="btn btn-cyan car-name-button" data-form="${dataName}-button">확인</button>
    </div>
  `
}

export default SubForm;
